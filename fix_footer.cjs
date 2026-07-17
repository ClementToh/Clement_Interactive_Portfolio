const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldFooterInner = `<div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 font-mono">
          <p>© Clement Toh - Mechatronics Systems & Validation</p>
          <p>Resume</p>
        </div>`;

const newFooterInner = `<div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 font-mono">
          <p>© Clement Toh - Mechatronics Systems & Validation</p>
          <div className="flex flex-wrap justify-center items-center gap-5 font-medium">
            <a href="#co-op-logistics" className="hover:text-neutral-900 transition-colors">US Dossier</a>
            <a href="#lab-workspace" className="hover:text-neutral-900 transition-colors">Interactive</a>
            <a href="#projects-catalog" className="hover:text-neutral-900 transition-colors">Projects</a>
            <a href="#professional-background" className="hover:text-neutral-900 transition-colors">Experience</a>
            <button onClick={handleCopyEmail} className="hover:text-neutral-900 transition-colors cursor-pointer">Resume</button>
          </div>
        </div>`;

content = content.replace(oldFooterInner, newFooterInner);

fs.writeFileSync('src/App.tsx', content);

