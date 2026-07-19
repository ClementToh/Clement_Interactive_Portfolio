const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const target = `<ErrorBoundary fallbackRender={({ error: err }) => (
                    <div className="text-rose-500 font-mono text-xs text-center">
                      3D Model Error: {err?.message || "Unknown error"}
                    </div>
                  )}>`;

const replacement = `<ErrorBoundary fallbackRender={({ error: err }) => (
                    <div className="flex flex-col items-center justify-center space-y-4 w-64 transition-all duration-500 relative z-10">
                      <div className="absolute -top-12 left-0 right-0 text-[9px] text-rose-400 font-mono text-center bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                        3D Model Not Available - Using Fallback
                      </div>
                      <div onClick={() => setActivePart("IPG Ytterbium Fibre laser")} className={\`p-3 rounded border text-center transition-all cursor-pointer \${activePart === "IPG Ytterbium Fibre laser" ? "bg-rose-500 text-white border-rose-400 font-semibold shadow-lg shadow-rose-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-rose-500 hover:text-white"}\`}>
                        <span className="font-mono text-xs block">Laser Optic Assembly</span>
                        <span className="text-[9px] block opacity-80">IPG Fibre Source + QBH Head</span>
                      </div>
                      <div onClick={() => setActivePart("Constrained 4040 Al Chassis")} className={\`p-4 rounded border text-center transition-all cursor-pointer \${activePart === "Constrained 4040 Al Chassis" ? "bg-blue-500 text-white border-blue-400 font-semibold shadow-lg shadow-blue-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-blue-500 hover:text-white"}\`}>
                        <span className="font-mono text-xs block">Vibration-Isolated Chassis</span>
                        <span className="text-[9px] block opacity-80">4040 Extruded Aluminium Frame</span>
                      </div>
                      <div onClick={() => setActivePart("Dual-Chamber Chiller Routing")} className={\`p-3 rounded border text-center transition-all cursor-pointer \${activePart === "Dual-Chamber Chiller Routing" ? "bg-amber-500 text-white border-amber-400 font-semibold shadow-lg shadow-amber-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-amber-500 hover:text-white"}\`}>
                        <span className="font-mono text-xs block">Thermal Cooling Duct</span>
                        <span className="text-[9px] block opacity-80">2.4 kW Heat Dissipation Loop</span>
                      </div>
                    </div>
                  )}>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/CADShowcase.tsx', content);
