const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Title 1
content = content.replace(
  'United States Co-Op Placement Quick Dossier',
  'United States Co-Op / Internship Candidate'
);

// Timeline Date Blue
content = content.replace(
  '<p className="text-neutral-700 font-semibold font-sans">\n                January 4th, 2027 – July 30th, 2027',
  '<p className="text-blue-600 font-semibold font-sans">\n                January 4th, 2027 – July 30th, 2027'
);

// "Interactive Project Validation & Diagnostic Workbench" -> "Interactive Project Validation"
content = content.replace(
  'Interactive Project Validation & Diagnostic Workbench',
  'Interactive Project Validation'
);

// Headers spacing: "text-center space-y-2 max-w-xl mx-auto" -> "text-center space-y-4 max-w-xl mx-auto"
content = content.replaceAll(
  '<div className="text-center space-y-2 max-w-xl mx-auto">',
  '<div className="text-center space-y-4 max-w-xl mx-auto">'
);

fs.writeFileSync('src/App.tsx', content);
