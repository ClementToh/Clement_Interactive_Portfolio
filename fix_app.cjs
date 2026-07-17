const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldResourcesHeader = `<div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-full">
              Document Registry
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Resources
            </h2>
          </div>`;

const newResourcesHeader = `<div className="text-center space-y-6 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-mono font-bold tracking-tight text-violet-700 bg-violet-50 border border-violet-200 px-6 py-2.5 rounded-full inline-flex justify-center shadow-sm">
              Resources
            </h2>
          </div>`;

content = content.replace(oldResourcesHeader, newResourcesHeader);

const oldFooter = `<div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 font-mono">
          <p>© Clement Toh - Mechatronics Systems & Validation</p>
        </div>`;

const newFooter = `<div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 font-mono">
          <p>© Clement Toh - Mechatronics Systems & Validation</p>
          <p>Resume</p>
        </div>`;

content = content.replace(oldFooter, newFooter);

fs.writeFileSync('src/App.tsx', content);

let dataContent = fs.readFileSync('src/data.ts', 'utf8');
dataContent = dataContent.replace(
  'description: "Detailed 2023 research report documenting EOS M 290 12-channel DAQ routing and packet sniffing."',
  'description: "Documentation of EOS M 290 12-channel DAQ routing and packet sniffing."'
);

dataContent = dataContent.replace(
  'description: "Visual presentation poster summarizing the optomechanical and IIoT results from ARTC."',
  'description: "Summarized optomechanical and IIoT results from ARTC."'
);

dataContent = dataContent.replace(
  'description: "Personal performance and capability letter of recommendation from Dr. Zheng Jie Tan."',
  'description: "Recommendation letter from Dr. Zheng Jie Tan."'
);
fs.writeFileSync('src/data.ts', dataContent);

