const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /const getDocStyles = \(name: string\) => \{[\s\S]*?\}\n\}\;\n/;
const newHelper = `const getDocStyles = (name: string) => {
  if (name.includes("Resume")) {
    return {
      card: "bg-blue-50/50 border-blue-100 hover:bg-blue-50",
      badge: "bg-blue-100/50 text-blue-500 border-blue-100"
    };
  } else if (name.includes("A*STAR")) {
    return {
      card: "bg-yellow-50/50 border-yellow-100 hover:bg-yellow-50",
      badge: "bg-yellow-100/50 text-yellow-600 border-yellow-100"
    };
  } else if (name.includes("Singapore Polytechnic") || name.includes("Book Prize")) {
    return {
      card: "bg-fuchsia-50/50 border-fuchsia-100 hover:bg-fuchsia-50",
      badge: "bg-fuchsia-100/50 text-fuchsia-500 border-fuchsia-100"
    };
  } else if (name.includes("SAF ")) {
    return {
      card: "bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50",
      badge: "bg-emerald-100/50 text-emerald-500 border-emerald-100"
    };
  } else {
    return {
      card: "bg-purple-50/50 border-purple-100 hover:bg-purple-50",
      badge: "bg-purple-100/50 text-purple-500 border-purple-100"
    };
  }
};
`;

const startIndex = content.indexOf('const getDocStyles');
const exportIndex = content.indexOf('export default function App');
content = content.substring(0, startIndex) + newHelper + content.substring(exportIndex);

fs.writeFileSync('src/App.tsx', content);
