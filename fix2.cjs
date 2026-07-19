const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /<button onClick=\{handleCopyEmail\} className="hover:text-neutral-900 transition-colors cursor-pointer">Resume[\s\S]*?<Thermometer className="w-4 h-4 shrink-0" \/>\s*Thermal Shroud\s*<\/button>\s*<\/div>/,
  '<button onClick={handleCopyEmail} className="hover:text-neutral-900 transition-colors cursor-pointer">Resume</button></div>'
);

const webcamMatch = `<Video className="w-4 h-4 shrink-0" />
                Webcam Streaming
              </button>`;

const thermalTab = `
              <button
                onClick={() => setActiveWorkspaceTab("thermal")}
                className={\`px-3 md:px-5 py-3 border-b-2 font-bold transition-all flex items-center gap-1.5 md:gap-2 cursor-pointer \${
                  activeWorkspaceTab === "thermal"
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }\`}
              >
                <Thermometer className="w-4 h-4 shrink-0" />
                Thermal Shroud
              </button>`;

content = content.replace(webcamMatch, webcamMatch + thermalTab);

fs.writeFileSync('src/App.tsx', content);
