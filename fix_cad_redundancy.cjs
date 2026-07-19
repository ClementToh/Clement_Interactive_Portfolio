const fs = require('fs');

let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

// Replace the Explode Assembly Layout button
content = content.replace(
  /<button\s*onClick=\{\(\) => setExploded\(!exploded\)\}\s*className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-750 rounded transition-colors text-xs cursor-pointer"\s*>\s*\{exploded \? "Collapse Assembly" : "Explode Assembly Layout"\}\s*<\/button>/g,
  ''
);

fs.writeFileSync('src/components/CADShowcase.tsx', content);
