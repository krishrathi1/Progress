const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, '..', 'public', 'notes');
const manifestPath = path.join(notesDir, 'manifest.json');

const manifest = [];

const subjects = fs.readdirSync(notesDir).filter(name => {
  return fs.statSync(path.join(notesDir, name)).isDirectory();
});

subjects.forEach(sub => {
  const subPath = path.join(notesDir, sub);
  const files = fs.readdirSync(subPath).filter(f => f.endsWith('.md'));
  files.forEach(file => {
    const slug = path.basename(file, '.md');
    manifest.push(`${sub}:${slug}`);
  });
});

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Successfully rebuilt manifest.json with ${manifest.length} notes!`);
