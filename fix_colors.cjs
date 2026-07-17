const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const helper = `const getDocStyles = (name: string) => {
  if (name.includes("Resume")) {
    return {
      card: "bg-blue-50 border-blue-200 hover:border-blue-300",
      badge: "bg-blue-100 text-blue-700 border-blue-200"
    };
  } else if (name.includes("A*STAR")) {
    return {
      card: "bg-amber-50 border-amber-200 hover:border-amber-300",
      badge: "bg-amber-100 text-amber-700 border-amber-200"
    };
  } else if (name.includes("Singapore Polytechnic") || name.includes("Book Prize")) {
    return {
      card: "bg-fuchsia-50 border-fuchsia-200 hover:border-fuchsia-300",
      badge: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200"
    };
  } else if (name.includes("SAF ")) {
    return {
      card: "bg-emerald-50 border-emerald-200 hover:border-emerald-300",
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200"
    };
  } else {
    return {
      card: "bg-purple-50 border-purple-200 hover:border-purple-300",
      badge: "bg-purple-100 text-purple-700 border-purple-200"
    };
  }
};`;

content = content.replace(
  'export default function App() {',
  helper + '\n\nexport default function App() {'
);

const oldCard = 'className={`border hover:border-violet-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group cursor-pointer ${doc.category === "Career Resume" ? "bg-blue-50 border-blue-200" : "bg-white border-neutral-200"}`}';
const newCard = 'className={`border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group cursor-pointer ${getDocStyles(doc.name).card}`}';

content = content.replace(oldCard, newCard);

const oldBadge = '<span className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${doc.category === "Career Resume" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-violet-50 text-violet-700 border-violet-100"}`}>';
const newBadge = '<span className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getDocStyles(doc.name).badge}`}>';

content = content.replace(oldBadge, newBadge);

fs.writeFileSync('src/App.tsx', content);
