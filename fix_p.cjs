const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<p className="text-xs text-neutral-500 leading-normal font-sans">\n                    {doc.description}\n                  </p>',
  '{doc.description && (\n                  <p className="text-xs text-neutral-500 leading-normal font-sans">\n                    {doc.description}\n                  </p>\n                  )}'
);

fs.writeFileSync('src/App.tsx', content);

