const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'import { \n  Briefcase,',
  'import { Menu, X, \n  Briefcase,'
);

fs.writeFileSync('src/App.tsx', content);
