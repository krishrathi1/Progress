const ts = require(process.cwd()+'/node_modules/typescript');
const fs = require('fs'); const path = require('path'); const os = require('os');
function load(file){
  const src = fs.readFileSync(file,'utf8');
  const js = ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const tmp = path.join(os.tmpdir(),'q_'+file.replace(/[^a-z0-9]/gi,'_')+'.cjs');
  fs.writeFileSync(tmp,js); return require(tmp);
}
const slug = (n)=> n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const tracks = [];
for (const f of ['dsa','java','cs-core','system-devops'].map(x=>`src/lib/curriculum/${x}.ts`)){
  const m = load(f); for (const k of Object.keys(m)){ const t=m[k]; if (t && Array.isArray(t.sections)) tracks.push(t); }
}
const all = [];
for (const t of tracks) t.sections.forEach(sec=> sec.items.forEach(raw=>{
  const name = Array.isArray(raw)?raw[0]:raw; const diff = Array.isArray(raw)?raw[1]:null;
  all.push({ subjectId:t.id, subjectName:t.name, short:t.short, kind:t.kind, source:t.source, section:sec.name, name, difficulty:diff, slug:slug(name), key:`${t.id}:${slug(name)}` });
}));
// exclude already-written files
const exists = (t)=> fs.existsSync(path.join('public','notes',t.subjectId, t.slug+'.md'));
const remaining = all.filter(t=> !exists(t));
// theory subjects FIRST, dsa last
const ORDER = ['java','oop','dbms','os','cn','sd','aws','docker','sql','dsa'];
remaining.sort((a,b)=> ORDER.indexOf(a.subjectId) - ORDER.indexOf(b.subjectId));
fs.writeFileSync('notes-gen/topics.json', JSON.stringify(remaining));
const byS = {}; for (const t of remaining) byS[t.subjectId]=(byS[t.subjectId]||0)+1;
console.log('already written:', all.length - remaining.length);
console.log('remaining to generate:', remaining.length);
console.log('by subject (gen order):'); for (const s of ORDER) if(byS[s]) console.log('  '+s+': '+byS[s]);
