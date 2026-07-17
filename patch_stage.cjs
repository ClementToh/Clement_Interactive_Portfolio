const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

// Replace Stage with ambientLight and directionalLight
content = content.replace(/<Stage environment="city" intensity=\{0\.5\}>/g, '<ambientLight intensity={1} /><directionalLight position={[10, 10, 10]} intensity={2} /><Center>');
content = content.replace(/<\/Stage>/g, '</Center>');

// Add Center to imports if not there
if (!content.includes('Center,')) {
    content = content.replace('OrbitControls, Stage,', 'OrbitControls, Center, Stage,');
}

fs.writeFileSync('src/components/CADShowcase.tsx', content);
