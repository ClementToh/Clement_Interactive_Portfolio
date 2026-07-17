const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

// Find ErrorBoundary fallback={ and replace with fallback={(error) => (
const regex = /<ErrorBoundary fallback=\{/g;
content = content.replace(regex, '<ErrorBoundary fallback={(error: any) => (');

// Also close the function correctly, finding the matching closing tag
// Actually it's easier to just replace the text inside the fallback to display the error.
const regex2 = /3D Model GLB file is corrupted\. Showing 2D schematic\./g;
content = content.replace(regex2, '3D Model Error: {error?.message || "Unknown error"}');

// And we need to fix the closing brace for fallback={(error: any) => (
// Since there's only one ErrorBoundary, let's just do it manually via a string replace
const regex3 = /                    \}>/g;
content = content.replace(regex3, '                    )}>');

fs.writeFileSync('src/components/CADShowcase.tsx', content);
