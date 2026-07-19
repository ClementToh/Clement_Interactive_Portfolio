const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Update activeWorkspaceTab type
content = content.replace(
  /const \[activeWorkspaceTab, setActiveWorkspaceTab\] = useState<"telemetry" \| "cad">/,
  'const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"telemetry" | "cad" | "spectrometer" | "webcam">'
);

// Add Video, Activity to lucide-react imports if not there
if (!content.includes('Video, Activity')) {
  content = content.replace(/import \{([^}]+)\} from "lucide-react";/, (match, p1) => {
    return `import { ${p1}, Video, Activity } from "lucide-react";`;
  });
}

// Add the new interactive components imports
content = content.replace(
  /import CADShowcase from "\.\/components\/CADShowcase";/,
  `import CADShowcase from "./components/CADShowcase";
import SpectrometerSync from "./components/SpectrometerSync";
import WebcamStreaming from "./components/WebcamStreaming";`
);

// Replace the Core Lab Switchers
const newTabs = `          <div className="flex justify-start md:justify-center border-b border-neutral-200 overflow-x-auto hide-scrollbar whitespace-nowrap">
            <div className="flex gap-2 font-mono text-xs">
              <button
                onClick={() => setActiveWorkspaceTab("cad")}
                className={\`px-3 md:px-5 py-3 border-b-2 font-bold transition-all flex items-center gap-1.5 md:gap-2 cursor-pointer \${
                  activeWorkspaceTab === "cad"
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }\`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                Laser Workstation CAD
              </button>
              
              <button
                onClick={() => setActiveWorkspaceTab("telemetry")}
                className={\`px-3 md:px-5 py-3 border-b-2 font-bold transition-all flex items-center gap-1.5 md:gap-2 cursor-pointer \${
                  activeWorkspaceTab === "telemetry"
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }\`}
              >
                <Cpu className="w-4 h-4 shrink-0" />
                Telemetry Pipeline
              </button>

              <button
                onClick={() => setActiveWorkspaceTab("spectrometer")}
                className={\`px-3 md:px-5 py-3 border-b-2 font-bold transition-all flex items-center gap-1.5 md:gap-2 cursor-pointer \${
                  activeWorkspaceTab === "spectrometer"
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }\`}
              >
                <Activity className="w-4 h-4 shrink-0" />
                Spectrometer Sync
              </button>

              <button
                onClick={() => setActiveWorkspaceTab("webcam")}
                className={\`px-3 md:px-5 py-3 border-b-2 font-bold transition-all flex items-center gap-1.5 md:gap-2 cursor-pointer \${
                  activeWorkspaceTab === "webcam"
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }\`}
              >
                <Video className="w-4 h-4 shrink-0" />
                Webcam Streaming
              </button>
            </div>
          </div>`;

content = content.replace(/<div className="flex justify-center border-b border-neutral-200">[\s\S]*?<\/div>\s*<\/div>/, newTabs);

// Update Active Work Panel viewport
const newViewport = `          <div className="transition-all duration-300">
            {activeWorkspaceTab === "cad" && <CADShowcase />}
            {activeWorkspaceTab === "telemetry" && <TelemetryDashboard />}
            {activeWorkspaceTab === "spectrometer" && <SpectrometerSync />}
            {activeWorkspaceTab === "webcam" && <WebcamStreaming />}
          </div>`;

content = content.replace(/<div className="transition-all duration-300">\s*\{activeWorkspaceTab === "telemetry" && <TelemetryDashboard \/>\}\s*\{activeWorkspaceTab === "cad" && <CADShowcase \/>\}\s*<\/div>/, newViewport);

fs.writeFileSync('src/App.tsx', content);
