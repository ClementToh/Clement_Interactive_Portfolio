const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const regex = /<ErrorBoundary fallback=\{[\s\S]*?\}>/;
const replacement = `<ErrorBoundary fallback={<div className="w-full h-full bg-red-500 text-white flex items-center justify-center">ERROR LOADING GLB</div>}>`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/components/CADShowcase.tsx', content);
  console.log("Success");
} else {
  console.log("No match");
}
