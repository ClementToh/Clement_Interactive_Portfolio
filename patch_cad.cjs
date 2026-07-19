const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

// Replace the selectedProject state and project variable
content = content.replace(
  /const \[selectedProject, setSelectedProject\] = useState\("jd-union"\);\s*const \[exploded, setExploded\] = useState\(false\);\s*const \[activePart, setActivePart\] = useState<string \| null>\(null\);\s*const project = PROJECTS\.find\(\(p\) => p\.id === selectedProject\) \|\| PROJECTS\[0\];\s*const cadData = project\.cadInteractiveData;\s*const getHeaderDetails = \(\) => \{[\s\S]*?\};\s*/,
  `const [exploded, setExploded] = useState(false);
  const [activePart, setActivePart] = useState<string | null>(null);

  const project = PROJECTS.find((p) => p.id === "jd-union") || PROJECTS[0];
  const cadData = project.cadInteractiveData;

  const headerDetails = { title: "CAD Assembly & DFM Specifications", sub: "Explore mechanical design parameters and structural dimension constraints." };
`
);

// Replace the header details function calls
content = content.replace(/getHeaderDetails\(\)\.title/g, 'headerDetails.title');
content = content.replace(/getHeaderDetails\(\)\.sub/g, 'headerDetails.sub');

// Remove the project selector buttons
content = content.replace(/<div className="flex overflow-x-auto hide-scrollbar border-b border-neutral-200">[\s\S]*?<\/div>\s*<\/div>\s*<div className="grid grid-cols-1 lg:grid-cols-12">/, '<div className="grid grid-cols-1 lg:grid-cols-12">');

fs.writeFileSync('src/components/CADShowcase.tsx', content);
