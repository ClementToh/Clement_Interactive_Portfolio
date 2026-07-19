const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const newButtons = `<div className="flex bg-neutral-100 p-0.5 rounded-lg text-xs font-mono overflow-x-auto max-w-full">
          <button
            onClick={() => { setSelectedProject("jd-union"); setActivePart(null); }}
            className={\`whitespace-nowrap px-3 py-1.5 rounded-md transition-all cursor-pointer \${selectedProject === "jd-union" ? "bg-white text-neutral-900 font-semibold shadow-sm" : "text-neutral-500 hover:text-neutral-900"}\`}
          >
            Laser Workstation
          </button>
          <button
            onClick={() => { setSelectedProject("astar-iiot"); setActivePart(null); }}
            className={\`whitespace-nowrap px-3 py-1.5 rounded-md transition-all cursor-pointer \${selectedProject === "astar-iiot" ? "bg-white text-neutral-900 font-semibold shadow-sm" : "text-neutral-500 hover:text-neutral-900"}\`}
          >
            EOS M 290 Passthrough
          </button>
          <button
            onClick={() => { setSelectedProject("spectrometer-sync"); setActivePart(null); }}
            className={\`whitespace-nowrap px-3 py-1.5 rounded-md transition-all cursor-pointer \${selectedProject === "spectrometer-sync" ? "bg-white text-neutral-900 font-semibold shadow-sm" : "text-neutral-500 hover:text-neutral-900"}\`}
          >
            Spectrometer Sync
          </button>
          <button
            onClick={() => { setSelectedProject("webcam-streaming"); setActivePart(null); }}
            className={\`whitespace-nowrap px-3 py-1.5 rounded-md transition-all cursor-pointer \${selectedProject === "webcam-streaming" ? "bg-white text-neutral-900 font-semibold shadow-sm" : "text-neutral-500 hover:text-neutral-900"}\`}
          >
            Webcam Streaming
          </button>
          <button
            onClick={() => { setSelectedProject("printer-thermal"); setActivePart(null); }}
            className={\`whitespace-nowrap px-3 py-1.5 rounded-md transition-all cursor-pointer \${selectedProject === "printer-thermal" ? "bg-white text-neutral-900 font-semibold shadow-sm" : "text-neutral-500 hover:text-neutral-900"}\`}
          >
            Printer Thermal Shroud
          </button>`;

content = content.replace(/<div className="flex bg-neutral-100 p-0\.5 rounded-lg text-xs font-mono">[\s\S]*?<\/div>\s*<\/div>\s*{\/\* Main Grid \*\/}/, 
  newButtons + '\n        </div>\n      </div>\n\n      {/* Main Grid */}');
fs.writeFileSync('src/components/CADShowcase.tsx', content);
