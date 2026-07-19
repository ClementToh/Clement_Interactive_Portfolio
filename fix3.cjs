const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

// Insert const selectedProject = "jd-union"; after const [activePart, setActivePart] = useState<string | null>(null);
content = content.replace(
  /const \[activePart, setActivePart\] = useState<string \| null>\(null\);/,
  'const [activePart, setActivePart] = useState<string | null>(null);\n  const selectedProject = "jd-union";'
);

fs.writeFileSync('src/components/CADShowcase.tsx', content);
