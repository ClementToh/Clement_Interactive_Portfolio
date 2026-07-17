const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

if (!content.includes('Bounds')) {
  content = content.replace('Center, Stage', 'Center, Stage, Bounds');
}

content = content.replace(/<Center>\s*<Model url="\/movable_laser_station_uncompressed\.glb" \/>\s*<\/Center>/g, 
  '<Bounds fit clip observe margin={1.2}>\n                          <Center>\n                            <Model url="/movable_laser_station_uncompressed.glb" />\n                          </Center>\n                        </Bounds>');

fs.writeFileSync('src/components/CADShowcase.tsx', content);
