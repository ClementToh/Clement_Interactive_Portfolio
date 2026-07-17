const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /\{p\.year\.split\(" "\)\[0\]\}/,
  '{p.year.split(" ").pop()}'
);

fs.writeFileSync('src/App.tsx', content);
