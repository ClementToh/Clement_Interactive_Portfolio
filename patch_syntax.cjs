const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const regex = /                  \}>/g;
content = content.replace(regex, '                  )}>\n');

fs.writeFileSync('src/components/CADShowcase.tsx', content);
