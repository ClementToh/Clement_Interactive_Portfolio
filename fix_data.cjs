const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');
content = content.replace('  {\n      {', '  {');
fs.writeFileSync('src/data.ts', content);
