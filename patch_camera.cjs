const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

// Change camera position to be closer
content = content.replace(/camera=\{\{ position: \[0, 0, 5\], fov: 50 \}\}/g, 'camera={{ position: [0, 0, 2.5], fov: 50 }}');

fs.writeFileSync('src/components/CADShowcase.tsx', content);
