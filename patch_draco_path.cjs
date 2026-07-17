const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const regex = /"https:\/\/www\.gstatic\.com\/draco\/versioned\/decoders\/1\.5\.5\/"/g;
content = content.replace(regex, '"/draco/"');

fs.writeFileSync('src/components/CADShowcase.tsx', content);
