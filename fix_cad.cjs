const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

// The block to remove is:
//         {/* Project select */}
//         <div className="flex bg-neutral-100 p-0.5 rounded-lg text-xs font-mono overflow-x-auto max-w-full">
//           ... all the buttons ...
//         </div>
//       </div>

content = content.replace(
  /\s*\{\/\* Project select \*\/\}\s*<div className="flex bg-neutral-100 p-0\.5 rounded-lg text-xs font-mono overflow-x-auto max-w-full">[\s\S]*?<\/div>/,
  ''
);

fs.writeFileSync('src/components/CADShowcase.tsx', content);
