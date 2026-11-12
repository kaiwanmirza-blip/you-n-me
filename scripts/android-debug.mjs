import { spawnSync } from 'node:child_process';
const windows=process.platform==='win32';
const command=windows?'cmd.exe':'./gradlew';
const args=windows?['/d','/s','/c','gradlew.bat assembleDebug']:['assembleDebug'];
const result=spawnSync(command,args,{cwd:new URL('../android/',import.meta.url),stdio:'inherit'});
if(result.error)console.error(result.error.message);
process.exit(result.status??1);
