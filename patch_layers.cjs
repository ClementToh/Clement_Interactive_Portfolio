const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const regex = /<ErrorBoundary fallback=\{[\s\S]*?\}>/;

const replacement = `<ErrorBoundary fallback={
                      <div className="space-y-3 w-48 transition-all duration-500">
                        {/* Laser optic core */}
                        <div
                          onClick={() => setActivePart("IPG Ytterbium Fibre laser")}
                          className={\`p-2.5 rounded border text-center transition-all cursor-pointer \${
                            exploded ? "translate-y-[-24px] rotate-1 scale-105" : ""
                          } \${
                            activePart === "IPG Ytterbium Fibre laser"
                              ? "bg-rose-500 text-white border-rose-400 font-semibold shadow-lg shadow-rose-900/30"
                              : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-rose-500 hover:text-white"
                          }\`}
                        >
                          <span className="font-mono text-xs block">Laser Optic Assembly</span>
                          <span className="text-[9px] block opacity-80">IPG Fibre Source + QBH Head</span>
                        </div>
                        {/* Precision motion XY stage */}
                        <div
                          onClick={() => setActivePart("Optomechanical XY Stage")}
                          className={\`p-2 rounded border text-center transition-all cursor-pointer \${
                            exploded ? "translate-y-[-8px] scale-102" : ""
                          } \${
                            activePart === "Optomechanical XY Stage"
                              ? "bg-blue-500 text-white border-blue-400 font-semibold shadow-lg shadow-blue-900/30"
                              : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-blue-500 hover:text-white"
                          }\`}
                        >
                          <span className="font-mono text-xs block">Precision Kinematics</span>
                          <span className="text-[9px] block opacity-80">Optomechanical Galvanometer</span>
                        </div>
                        {/* Aluminum chassis frame */}
                        <div
                          onClick={() => setActivePart("Constrained 4040 Al Chassis")}
                          className={\`p-3 rounded border text-center transition-all cursor-pointer \${
                            exploded ? "translate-y-[12px] rotate-[-1deg] scale-98" : ""
                          } \${
                            activePart === "Constrained 4040 Al Chassis"
                              ? "bg-emerald-500 text-white border-emerald-400 font-semibold shadow-lg shadow-emerald-900/30"
                              : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-emerald-500 hover:text-white"
                          }\`}
                        >
                          <span className="font-mono text-xs block">Vibration Isolated Frame</span>
                          <span className="text-[9px] block opacity-80">Constrained 4040 Aluminum Extrusion</span>
                        </div>
                        {/* Chiller / Cooling system */}
                        <div
                          onClick={() => setActivePart("Dual-Chamber Chiller Routing")}
                          className={\`p-2 rounded border text-center transition-all cursor-pointer \${
                            exploded ? "translate-y-[28px] scale-95" : ""
                          } \${
                            activePart === "Dual-Chamber Chiller Routing"
                              ? "bg-amber-500 text-white border-amber-400 font-semibold shadow-lg shadow-amber-900/30"
                              : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-amber-500 hover:text-white"
                          }\`}
                        >
                          <span className="font-mono text-xs block">Thermal Cooling Duct</span>
                          <span className="text-[9px] block opacity-80">2.4 kW Heat Dissipation Loop</span>
                        </div>
                        <div className="absolute top-2 left-2 text-[9px] text-rose-400 font-mono flex gap-1 items-center bg-rose-500/10 px-2 py-1 rounded">
                           3D Model file corrupted, falling back to 2D layer view.
                        </div>
                      </div>
                    }>`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/components/CADShowcase.tsx', content);
  console.log("Success");
} else {
  console.log("No match");
}
