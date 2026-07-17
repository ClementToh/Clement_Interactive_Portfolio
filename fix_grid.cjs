const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'className="bg-white border border-neutral-200 hover:border-violet-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group cursor-pointer"',
  'className={`border hover:border-violet-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group cursor-pointer ${doc.category === "Career Resume" ? "bg-blue-50 border-blue-200" : "bg-white border-neutral-200"}`}'
);

content = content.replace(
  '<span className="font-mono text-[8px] font-bold px-2 py-0.5 bg-violet-50 text-violet-700 border border-violet-100 rounded-full uppercase tracking-wider">',
  '<span className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${doc.category === "Career Resume" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-violet-50 text-violet-700 border-violet-100"}`}>'
);

fs.writeFileSync('src/App.tsx', content);
