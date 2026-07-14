const ts = require(process.cwd()+'/node_modules/typescript');
const fs = require('fs'); const path = require('path'); const os = require('os');
function load(file){
  const src = fs.readFileSync(file,'utf8');
  const js = ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const tmp = path.join(os.tmpdir(),'p_'+file.replace(/[^a-z0-9]/gi,'_')+'.cjs');
  fs.writeFileSync(tmp,js); return require(tmp);
}
const slug = (name)=> name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');

// 1) curriculum -> full topic list
const curFiles = ['dsa','java','cs-core','system-devops'].map(f=>`src/lib/curriculum/${f}.ts`);
const tracks = [];
for (const f of curFiles){ const m = load(f); for (const k of Object.keys(m)){ const t=m[k]; if (t && Array.isArray(t.sections)) tracks.push(t); } }
const topics = [];
for (const t of tracks){
  t.sections.forEach((sec)=>{
    sec.items.forEach((raw)=>{
      const name = Array.isArray(raw)?raw[0]:raw;
      const diff = Array.isArray(raw)?raw[1]:null;
      topics.push({ subjectId:t.id, subjectName:t.name, short:t.short, kind:t.kind, source:t.source, section:sec.name, name, difficulty:diff, slug:slug(name), key:`${t.id}:${slug(name)}` });
    });
  });
}
// 2) seeded notes -> write to public/notes and mark as existing
const dsaNotes = load('src/lib/notes/dsa.ts').dsaNotes;
const theoryNotes = load('src/lib/notes/theory.ts').theoryNotes;
const seeded = {};
for (const [s,md] of Object.entries(dsaNotes)) seeded[`dsa:${s}`]=md.trim();
for (const [sub,map] of Object.entries(theoryNotes)) for (const [s,md] of Object.entries(map)) seeded[`${sub}:${s}`]=md.trim();
let wrote=0;
for (const [key,md] of Object.entries(seeded)){
  const [sub,sl] = key.split(':');
  const dir = path.join('public','notes',sub); fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir, sl+'.md'), md+'\n'); wrote++;
}
// 3) topics still needing notes
const need = topics.filter(t=> !seeded[t.key]);
fs.writeFileSync('notes-gen/topics.json', JSON.stringify(need));
// pre-create all subject dirs
for (const t of tracks) fs.mkdirSync(path.join('public','notes',t.id),{recursive:true});
console.log('total topics:', topics.length);
console.log('seeded .md written:', wrote);
console.log('topics needing notes:', need.length);
console.log('tracks:', tracks.map(t=>t.id).join(', '));
