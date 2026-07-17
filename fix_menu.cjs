const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'import {',
  'import { Menu, X,'
);

content = content.replace(
  'const [copiedEmail, setCopiedEmail] = useState(false);',
  'const [copiedEmail, setCopiedEmail] = useState(false);\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);'
);

let oldNav = `<div className="flex items-center gap-3 md:gap-5 text-xs font-mono font-medium text-neutral-500">
            <a href="#co-op-logistics" className="hover:text-neutral-900 transition-colors">US Dossier</a>
            <a href="#lab-workspace" className="hover:text-neutral-900 transition-colors">Lab Workspace</a>
            <a href="#projects-catalog" className="hover:text-neutral-900 transition-colors">Projects</a>
            <a href="#professional-background" className="hover:text-neutral-900 transition-colors">Experience</a>
            <a href="#document-registry" className="hover:text-neutral-900 transition-colors">Credentials</a>
            <button
              onClick={handleCopyEmail}
              className="hover:text-neutral-900 transition-colors cursor-pointer hidden md:block"
            >
              Contact
            </button>
          </div>`;

let newNav = `          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5 text-xs font-mono font-medium text-neutral-500">
            <a href="#co-op-logistics" className="hover:text-neutral-900 transition-colors">US Dossier</a>
            <a href="#lab-workspace" className="hover:text-neutral-900 transition-colors">Lab Workspace</a>
            <a href="#projects-catalog" className="hover:text-neutral-900 transition-colors">Projects</a>
            <a href="#professional-background" className="hover:text-neutral-900 transition-colors">Experience</a>
            <a href="#document-registry" className="hover:text-neutral-900 transition-colors">Credentials</a>
            <button onClick={handleCopyEmail} className="hover:text-neutral-900 transition-colors cursor-pointer">Contact</button>
          </div>
          
          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2 text-neutral-500 hover:text-neutral-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 flex flex-col gap-4 text-xs font-mono font-medium text-neutral-500 shadow-lg absolute w-full">
            <a href="#co-op-logistics" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">US Dossier</a>
            <a href="#lab-workspace" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">Lab Workspace</a>
            <a href="#projects-catalog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">Projects</a>
            <a href="#professional-background" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">Experience</a>
            <a href="#document-registry" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">Credentials</a>
            <button onClick={() => { handleCopyEmail(); setIsMobileMenuOpen(false); }} className="hover:text-neutral-900 transition-colors text-left">Contact</button>
          </div>
        )}`;

content = content.replace(oldNav, newNav);

// Note: we replaced the closing </div> of max-w-6xl container in the newNav, so we need to adjust slightly.
fs.writeFileSync('src/App.tsx', content);
