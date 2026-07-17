const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Nav changes
content = content.replace(
  '<a href="#lab-workspace" className="hover:text-neutral-900 transition-colors">Lab Workspace</a>',
  '<a href="#lab-workspace" className="hover:text-neutral-900 transition-colors">Interactive</a>'
);
content = content.replace(
  '<a href="#document-registry" className="hover:text-neutral-900 transition-colors">Credentials</a>',
  ''
);
content = content.replace(
  '<button onClick={handleCopyEmail} className="hover:text-neutral-900 transition-colors cursor-pointer">Contact</button>',
  '<button onClick={handleCopyEmail} className="hover:text-neutral-900 transition-colors cursor-pointer">Resume</button>'
);

// Mobile Nav changes
content = content.replace(
  '<a href="#lab-workspace" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">Lab Workspace</a>',
  '<a href="#lab-workspace" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">Interactive</a>'
);
content = content.replace(
  '<a href="#document-registry" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">Credentials</a>',
  ''
);
content = content.replace(
  '<button onClick={() => { handleCopyEmail(); setIsMobileMenuOpen(false); }} className="hover:text-neutral-900 transition-colors text-left">Contact</button>',
  '<button onClick={() => { handleCopyEmail(); setIsMobileMenuOpen(false); }} className="hover:text-neutral-900 transition-colors text-left">Resume</button>'
);

// Fix the header for Professional Background
const oldBgHeader = `<div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
              Professional Background
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Educational & Professional Dossier
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">`;

const newBgHeader = `<div className="text-center space-y-6 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-mono font-bold tracking-tight text-blue-700 bg-blue-50 border border-blue-200 px-6 py-2.5 rounded-full inline-flex justify-center shadow-sm">
              Professional Background
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">`;

content = content.replace(oldBgHeader, newBgHeader);

fs.writeFileSync('src/App.tsx', content);
