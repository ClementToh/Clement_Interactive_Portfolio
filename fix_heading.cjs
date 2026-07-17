const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldHeader = `<div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
              Interactive Systems Lab
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Interactive Project Validation
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">`;

const newHeader = `<div className="text-center space-y-6 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-mono font-bold tracking-tight text-blue-700 bg-blue-50 border border-blue-200 px-6 py-2.5 rounded-full inline-flex justify-center shadow-sm">
              Interactive Project Validation
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">`;

content = content.replace(oldHeader, newHeader);
fs.writeFileSync('src/App.tsx', content);
