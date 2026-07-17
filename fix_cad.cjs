const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

content = content.replace(
  'Interactive CAD Assembly & DFM Specifications',
  'CAD Assembly & DFM Specifications'
);

content = content.replace(
  'Laser test bench',
  'Laser Workstation'
);

fs.writeFileSync('src/components/CADShowcase.tsx', content);
