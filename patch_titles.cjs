const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const headerLogic = `  const cadData = project.cadInteractiveData;

  const getHeaderDetails = () => {
    switch (selectedProject) {
      case "jd-union": return { title: "CAD Assembly & DFM Specifications", sub: "Explore mechanical design parameters and structural dimension constraints." };
      case "astar-iiot": return { title: "Telemetry & Edge Architecture", sub: "Interactive breakdown of the custom PCB passthrough and edge-node pipeline." };
      case "spectrometer-sync": return { title: "Network Pipeline & Sync Logic", sub: "Kinematic-to-optical synchronization via EPL V2 packet sniffing." };
      case "webcam-streaming": return { title: "Remote Streaming Architecture", sub: "Live HTTP video streaming setup and thermal-shielded camera mount." };
      case "printer-thermal": return { title: "Thermal & Fluid Dynamics", sub: "Laminar airflow shroud and upgraded thermal hardware breakdown." };
      default: return { title: "Interactive Project Validation", sub: "Explore system architecture and parameters." };
    }
  };
  const headerDetails = getHeaderDetails();`;

content = content.replace('  const cadData = project.cadInteractiveData;', headerLogic);

content = content.replace(
  /<h3 className="text-neutral-900 font-bold text-base flex items-center gap-2">\s*<Layers className="w-5 h-5 text-neutral-500 shrink-0" \/>\s*CAD Assembly & DFM Specifications\s*<\/h3>\s*<p className="text-xs text-neutral-500 mt-0\.5">Explore the mechanical design parameters and structural dimension constraints\.<\/p>/,
  `<h3 className="text-neutral-900 font-bold text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-neutral-500 shrink-0" />
            {headerDetails.title}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">{headerDetails.sub}</p>`
);

content = content.replace(
  /<div className="absolute top-4 left-4 font-mono text-\[9px\] text-neutral-600 border-l border-t border-neutral-800 p-1">\s*3RD ANGLE PROJECTION\s*<\/div>/,
  `{selectedProject === "jd-union" && (
                <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-600 border-l border-t border-neutral-800 p-1">
                  3RD ANGLE PROJECTION
                </div>
              )}`
);

fs.writeFileSync('src/components/CADShowcase.tsx', content);
