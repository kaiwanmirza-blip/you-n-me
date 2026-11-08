import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8');
const config=JSON.parse(read('capacitor.config.json'));
assert.equal(config.webDir,'dist');assert.equal(config.appId,'com.example.youandme.dev');assert.equal(config.server?.url,undefined);
const manifest=read('android/app/src/main/AndroidManifest.xml');
const permissions=[...manifest.matchAll(/<uses-permission\s+android:name="([^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(permissions,['android.permission.INTERNET']);
const plist=read('ios/App/App/Info.plist');assert(!/NS(Camera|PhotoLibrary|Health|Microphone).*UsageDescription/.test(plist));
assert(!/UISupportedInterfaceOrientations[^]*UIRequiresFullScreen/.test(plist));
for(const root of ['android/app/src/main/assets','ios/App/App']){
 const copied=JSON.parse(read(root+'/capacitor.config.json'));assert.equal(copied.server?.url,undefined);
 assert.equal(copied.appId,config.appId);
 const assets=fs.readdirSync('dist',{recursive:true,withFileTypes:true}).filter(e=>e.isFile());
 for(const e of assets){const path=(e.parentPath||e.path)+'/'+e.name;const relative=path.replaceAll('\\','/').replace(/^dist\//,'');
 const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');assert.equal(hash(path),hash(root+'/public/'+relative),`Asset mismatch: ${relative}`);}
 assert(!fs.existsSync(root+'/public/server'));assert(!fs.existsSync(root+'/public/.env'));
}
console.log('PASS: both platform configs bundle matching dist assets; no remote server URL, server source, private env or sensitive permission declarations. Native compilation/runtime not verified.');
