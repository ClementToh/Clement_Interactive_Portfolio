const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const newHelpers = `const getProjectStyles = (company: string, isSelected: boolean) => {
  if (company.includes("JD Union")) {
    return isSelected
      ? "bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-300"
      : "bg-blue-50/30 hover:bg-blue-50 border-blue-100 hover:shadow-sm";
  } else if (company.includes("A*STAR")) {
    return isSelected
      ? "bg-yellow-50 border-yellow-300 shadow-md ring-1 ring-yellow-300"
      : "bg-yellow-50/30 hover:bg-yellow-50 border-yellow-100 hover:shadow-sm";
  } else if (company.includes("Personal")) {
    return isSelected
      ? "bg-emerald-50 border-emerald-300 shadow-md ring-1 ring-emerald-300"
      : "bg-emerald-50/30 hover:bg-emerald-50 border-emerald-100 hover:shadow-sm";
  }
  return isSelected
    ? "bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900"
    : "bg-neutral-50 hover:bg-white border-neutral-200 hover:shadow-sm";
};

const getProjectContainerStyle = (company: string) => {
  if (company.includes("JD Union")) return "bg-blue-50/50 border-blue-100";
  if (company.includes("A*STAR")) return "bg-yellow-50/50 border-yellow-100";
  if (company.includes("Personal")) return "bg-emerald-50/50 border-emerald-100";
  return "bg-white border-neutral-200";
};

export default function App() {`;

content = content.replace('export default function App() {', newHelpers);

const oldButtonClass = 'className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer block ${\n                    selectedProjectId === p.id\n                      ? "bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900"\n                      : "bg-neutral-50 hover:bg-white border-neutral-200 hover:shadow-sm"\n                  }`}\n                >';

const newButtonClass = 'className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer block ${getProjectStyles(p.company, selectedProjectId === p.id)}`}\n                >';

content = content.replace(oldButtonClass, newButtonClass);

const oldContainerClass = 'className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-md h-full flex flex-col justify-between space-y-6"';
const newContainerClass = 'className={`${getProjectContainerStyle(activeProject.company)} border rounded-2xl p-6 md:p-8 shadow-md h-full flex flex-col justify-between space-y-6`}';

content = content.replace(oldContainerClass, newContainerClass);

fs.writeFileSync('src/App.tsx', content);
