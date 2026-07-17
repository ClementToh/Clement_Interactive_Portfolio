const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

content = content.replace(
  /className="relative w-72 h-64 border border-neutral-850 bg-neutral-950\/20 rounded-xl flex flex-col items-center justify-center p-4 overflow-hidden shadow-inner"/,
  'className="relative w-full h-full min-h-[350px] border border-neutral-850 bg-neutral-950/20 rounded-xl flex flex-col items-center justify-center p-0 overflow-hidden shadow-inner"'
);

// We need to fix the JD Union replacement from before which still has the `minHeight: "300px"` style.
content = content.replace(
  /<div className="space-y-4 w-full flex flex-col items-center relative z-10">/,
  '<div className="w-full h-full flex flex-col items-center relative z-10">'
);

fs.writeFileSync('src/components/CADShowcase.tsx', content);
