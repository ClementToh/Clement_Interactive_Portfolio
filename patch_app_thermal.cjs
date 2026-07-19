const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Update activeWorkspaceTab type
content = content.replace(
  /const \[activeWorkspaceTab, setActiveWorkspaceTab\] = useState<"telemetry" \| "cad" \| "spectrometer" \| "webcam">/,
  'const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"telemetry" | "cad" | "spectrometer" | "webcam" | "thermal">'
);

// Add Thermometer to lucide-react imports if not there
if (!content.includes('Thermometer')) {
  content = content.replace(/import \{([^}]+)\} from "lucide-react";/, (match, p1) => {
    return `import { ${p1}, Thermometer } from "lucide-react";`;
  });
}

// Add ThermalShroud import
content = content.replace(
  /import WebcamStreaming from "\.\/components\/WebcamStreaming";/,
  `import WebcamStreaming from "./components/WebcamStreaming";
import ThermalShroud from "./components/ThermalShroud";`
);

// Add the Thermal tab
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
              </button>
            </div>`;

content = content.replace(/<\/button>\s*<\/div>/, thermalTab);

// Add the Thermal Viewport
const thermalViewport = `
            {activeWorkspaceTab === "webcam" && <WebcamStreaming />}
            {activeWorkspaceTab === "thermal" && <ThermalShroud />}`;

content = content.replace(/\{activeWorkspaceTab === "webcam" && <WebcamStreaming \/>\}/, thermalViewport);

fs.writeFileSync('src/App.tsx', content);
