const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const regex = /<div className="w-full h-full flex flex-col items-center justify-center relative z-10" style=\{\{ height: "100%", width: "100%", minHeight: "350px" \}\}>[\s\S]*?<\/ErrorBoundary>\n                  <\/div>/;

const replacement = `<ErrorBoundary fallback={
                  <div className="space-y-3 w-48 transition-all duration-500 relative z-10">
                    <div className="absolute -top-8 left-0 right-0 text-[9px] text-rose-400 font-mono text-center bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                      3D Model GLB file is corrupted. Showing 2D schematic.
                    </div>
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
                  </div>
                }>
                  <div className="w-full h-full flex flex-col items-center justify-center relative z-10" style={{ height: "100%", width: "100%", minHeight: "350px" }}>
                    <div className="absolute top-2 right-2 z-20 bg-neutral-900/80 px-2 py-1 text-[10px] font-mono text-neutral-400 border border-neutral-700 rounded shadow-md pointer-events-none">
                      Drag to rotate | Scroll to zoom
                    </div>
                    <Suspense fallback={<div className="text-neutral-500 font-mono text-xs">Loading 3D Model...</div>}>
                      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: "100%", height: "100%", minHeight: "350px" }}>
                        <Stage environment="city" intensity={0.5}>
                          <Model url="/movable_laser_station.glb" />
                        </Stage>
                        <OrbitControls makeDefault autoRotate autoRotateSpeed={1.5} />
                      </Canvas>
                    </Suspense>
                  </div>
                </ErrorBoundary>`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/components/CADShowcase.tsx', content);
  console.log("Success");
} else {
  console.log("No match");
}
