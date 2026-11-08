import { DatabaseSync } from 'node:sqlite'
import { createHash } from 'node:crypto'
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'

export const migrationDirectory = fileURLToPath(new URL('../migrations/', import.meta.url))
function within(path: string, parent: string) {
  const rel = relative(parent, path)
  return rel === '' || (!rel.startsWith(`..${sep}`) && rel !== '..' && !isAbsolute(rel))
}
export function databasePath(candidate = process.env.YM_DATABASE_PATH, repo = process.cwd()): string {
  const path = candidate ?? (process.platform === 'win32'
    ? join(homedir(), 'AppData', 'Local', 'YouAndMe', 'local', 'you-n-me.sqlite')
    : join(homedir(), '.local', 'share', 'you-n-me', 'you-n-me.sqlite'))
  if (!isAbsolute(path) || !path.endsWith('.sqlite')) throw new Error('Database path must be absolute and end in .sqlite.')
  const normalized = resolve(path)
  let ancestor = normalized
  while (!existsSync(ancestor)) ancestor = dirname(ancestor)
  if (existsSync(normalized) && lstatSync(normalized).isSymbolicLink()) throw new Error('Database symlinks are not allowed.')
  const canonical = resolve(realpathSync(ancestor), relative(ancestor, normalized))
  const canonicalRepo = realpathSync(repo)
  if (within(canonical, canonicalRepo) || canonical.split(/[\\/]/).some(part => /^(onedrive.*|dropbox|google drive|googledrive|icloud.*|box)$/i.test(part))) {
    throw new Error('Database must be outside the repository and known cloud-sync folders.')
  }
  return canonical
}
export function openDatabase(path: string): DatabaseSync {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true, mode: 0o700 })
  const db = new DatabaseSync(path)
  db.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;')
  return db
}
export function transaction<T>(db: DatabaseSync, fn: () => T): T {
  db.exec('BEGIN IMMEDIATE')
  try { const result = fn(); db.exec('COMMIT'); return result } catch (error) { db.exec('ROLLBACK'); throw error }
}
export function migrate(db: DatabaseSync, directory = migrationDirectory): string[] {
  db.exec('CREATE TABLE IF NOT EXISTS local_migrations(version TEXT PRIMARY KEY, checksum TEXT NOT NULL)')
  const applied: string[] = []
  for (const filename of readdirSync(directory).filter(n => /^\d{4}_.+\.sql$/.test(n)).sort()) {
    const sql = readFileSync(join(directory, filename), 'utf8')
    const checksum = createHash('sha256').update(sql).digest('hex')
    const previous = db.prepare('SELECT checksum FROM local_migrations WHERE version=?').get(filename)
    if (previous) {
      if (previous.checksum !== checksum) throw new Error('Applied migration checksum changed; restore the original migration.')
      continue
    }
    transaction(db, () => {
      db.exec(sql)
      db.prepare('INSERT INTO local_migrations(version,checksum) VALUES (?,?)').run(filename, checksum)
    })
    applied.push(filename)
  }
  return applied
}
