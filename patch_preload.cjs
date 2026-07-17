const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');
if (!content.includes('useGLTF.preload')) {
  content += '\nuseGLTF.preload("/movable_laser_station_uncompressed.glb");\n';
  fs.writeFileSync('src/components/CADShowcase.tsx', content);
}
