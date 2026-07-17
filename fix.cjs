const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// replace title wrapper
content = content.replace(
  /<span className="font-mono font-bold text-base md:text-lg tracking-tight text-neutral-900 shrink-0">\s*Clement Toh <span className="text-neutral-400 font-normal">\| Mechatronics Systems<\/span>\s*<\/span>/,
  `<a 
              href="#root-container" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-mono font-bold text-base md:text-lg tracking-tight text-neutral-900 shrink-0 cursor-pointer"
            >
              Clement Toh <span className="text-neutral-400 font-normal">| Mechatronics Systems</span>
            </a>`
);

// Contacts block
let contactsRegex = /<a\s+href="https:\/\/www\.linkedin\.com\/in\/clement26"[\s\S]*?<\/a>\s*<a\s+href="assets\/Clement_Toh_US_Hardware_Engineering_2027\.pdf"[\s\S]*?<\/a>/;

let newContacts = `<a
            href="assets/Clement_Toh_US_Hardware_Engineering_2027.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-mono rounded-lg transition-all shadow-md"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-400" />
            View Resume PDF
          </a>
          <a
            href="https://www.linkedin.com/in/clement26"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 text-xs font-mono rounded-lg transition-all shadow-sm"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-500" />
            Linkedin
          </a>`;

content = content.replace(contactsRegex, newContacts);

fs.writeFileSync('src/App.tsx', content);
