const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const replacement = `                {selectedProject === "jd-union" ? (
                  <ErrorBoundary fallback={(error: any) => (
                  <div className="space-y-3 w-48 transition-all duration-500 relative z-10">
                    <div className="absolute -top-8 left-0 right-0 text-[9px] text-rose-400 font-mono text-center bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                      3D Model Error: {error?.message || "Unknown error"}
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
                      onClick={() => setActivePart("Constrained 4040 Al Chassis")}
                      className={\`p-4 rounded border text-center transition-all cursor-pointer \${
                        exploded ? "translate-y-[0px] scale-100" : ""
                      } \${
                        activePart === "Constrained 4040 Al Chassis"
                          ? "bg-blue-500 text-white border-blue-400 font-semibold shadow-lg shadow-blue-900/30"
                          : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-blue-500 hover:text-white"
                      }\`}
                    >
                      <span className="font-mono text-xs block">Vibration-Isolated Chassis</span>
                      <span className="text-[9px] block opacity-80">4040 Extruded Aluminium Frame</span>
                    </div>

                    {/* Thermal management */}
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
                )}>
                  <div className="w-full h-full flex flex-col items-center justify-center relative z-10" style={{ height: "100%", width: "100%", minHeight: "350px" }}>
                    <div className="absolute top-2 right-2 z-20 bg-neutral-900/80 px-2 py-1 text-[10px] font-mono text-neutral-400 border border-neutral-700 rounded shadow-md pointer-events-none">
                      Drag to rotate | Scroll to zoom
                    </div>
                    <Suspense fallback={<div className="text-neutral-500 font-mono text-xs">Loading 3D Model...</div>}>
                      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }} style={{ width: "100%", height: "100%", minHeight: "350px" }}>
                        <ambientLight intensity={1} /><directionalLight position={[10, 10, 10]} intensity={2} /><Bounds fit clip observe margin={1.2}>
                          <Center>
                            <Model url="/movable_laser_station_uncompressed.glb" />
                          </Center>
                        </Bounds>
                        <OrbitControls makeDefault autoRotate autoRotateSpeed={1.5} />
                      </Canvas>
                    </Suspense>
                  </div>
                </ErrorBoundary>
                ) : selectedProject === "astar-iiot" ? (
                  <div className="space-y-4 w-48 transition-all duration-500">
                    <div onClick={() => setActivePart("M5Stack Core2 Edge Device")} className={\`p-2 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[-20px] scale-105" : ""} \${activePart === "M5Stack Core2 Edge Device" ? "bg-violet-500 text-white border-violet-400 font-semibold shadow-lg shadow-violet-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-violet-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Telemetry Edge Node</span>
                      <span className="text-[9px] block opacity-80">M5Stack ESP32 Edge Device</span>
                    </div>
                    <div onClick={() => setActivePart("NI-9236 Strain Gauge Module")} className={\`p-3 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[0px]" : ""} \${activePart === "NI-9236 Strain Gauge Module" ? "bg-blue-500 text-white border-blue-400 font-semibold shadow-lg shadow-blue-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-blue-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">13mm Hermetic Passthrough</span>
                      <span className="text-[9px] block opacity-80">Sealed Flange Collar (Stainless Steel)</span>
                    </div>
                    <div onClick={() => setActivePart("Grafana Web Interface")} className={\`p-2 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[20px] scale-95" : ""} \${activePart === "Grafana Web Interface" ? "bg-emerald-500 text-white border-emerald-400 font-semibold shadow-lg shadow-emerald-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-emerald-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Active Vacuum Core</span>
                      <span className="text-[9px] block opacity-80">EOS Printer Argon Chamber Integrity</span>
                    </div>
                  </div>
                ) : selectedProject === "spectrometer-sync" ? (
                  <div className="space-y-4 w-52 transition-all duration-500">
                    <div onClick={() => setActivePart("Python EPL Packet Tap")} className={\`p-2 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[-20px] scale-105" : ""} \${activePart === "Python EPL Packet Tap" ? "bg-sky-500 text-white border-sky-400 font-semibold shadow-lg shadow-sky-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-sky-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Data Pipeline / IPC Tap</span>
                      <span className="text-[9px] block opacity-80">EPL V2 Network Packet Sniffer</span>
                    </div>
                    <div onClick={() => setActivePart("Spectrometer Digital Shutter")} className={\`p-3 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[0px]" : ""} \${activePart === "Spectrometer Digital Shutter" ? "bg-orange-500 text-white border-orange-400 font-semibold shadow-lg shadow-orange-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-orange-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Shutter Synchronization</span>
                      <span className="text-[9px] block opacity-80">Recoater Blade TTL Trigger Logic</span>
                    </div>
                    <div onClick={() => setActivePart("Firefly4000 Spectrometer")} className={\`p-2 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[20px] scale-95" : ""} \${activePart === "Firefly4000 Spectrometer" ? "bg-fuchsia-500 text-white border-fuchsia-400 font-semibold shadow-lg shadow-fuchsia-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-fuchsia-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Firefly4000 Spectrometer</span>
                      <span className="text-[9px] block opacity-80">Optical SMA905 Fiber Core</span>
                    </div>
                  </div>
                ) : selectedProject === "webcam-streaming" ? (
                  <div className="space-y-4 w-48 transition-all duration-500">
                    <div onClick={() => setActivePart("Live HTML Dashboard")} className={\`p-2 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[-20px] scale-105" : ""} \${activePart === "Live HTML Dashboard" ? "bg-indigo-500 text-white border-indigo-400 font-semibold shadow-lg shadow-indigo-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-indigo-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Remote View Client</span>
                      <span className="text-[9px] block opacity-80">HTTP Dashboard interface</span>
                    </div>
                    <div onClick={() => setActivePart("Python HTTP Server")} className={\`p-3 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[0px]" : ""} \${activePart === "Python HTTP Server" ? "bg-teal-500 text-white border-teal-400 font-semibold shadow-lg shadow-teal-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-teal-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Python MJPG Streamer</span>
                      <span className="text-[9px] block opacity-80">Socketserver processing on port 8002</span>
                    </div>
                    <div onClick={() => setActivePart("Anker PowerConf C200")} className={\`p-2 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[20px] scale-95" : ""} \${activePart === "Anker PowerConf C200" ? "bg-rose-500 text-white border-rose-400 font-semibold shadow-lg shadow-rose-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-rose-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Chamber Optic Lens</span>
                      <span className="text-[9px] block opacity-80">Anker PowerConf C200 (Thermal Shield)</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 w-48 transition-all duration-500">
                    <div onClick={() => setActivePart("WINSINN 5015 Blower Fans")} className={\`p-2 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[-20px] scale-105" : ""} \${activePart === "WINSINN 5015 Blower Fans" ? "bg-blue-500 text-white border-blue-400 font-semibold shadow-lg shadow-blue-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-blue-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Active Cooling Stage</span>
                      <span className="text-[9px] block opacity-80">Dual 5015 Blowers & 4010 Fan</span>
                    </div>
                    <div onClick={() => setActivePart("Custom Shroud (Fusion 360)")} className={\`p-3 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[0px]" : ""} \${activePart === "Custom Shroud (Fusion 360)" ? "bg-cyan-500 text-white border-cyan-400 font-semibold shadow-lg shadow-cyan-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-cyan-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Laminar Duct Shroud</span>
                      <span className="text-[9px] block opacity-80">Fusion 360 Optimized 32g Mount</span>
                    </div>
                    <div onClick={() => setActivePart("Textured PEI Spring Sheet")} className={\`p-2 rounded border text-center transition-all cursor-pointer \${exploded ? "translate-y-[20px] scale-95" : ""} \${activePart === "Textured PEI Spring Sheet" ? "bg-yellow-500 text-white border-yellow-400 font-semibold shadow-lg shadow-yellow-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-yellow-500 hover:text-white"}\`}>
                      <span className="font-mono text-xs block">Heated Extrusion Bed</span>
                      <span className="text-[9px] block opacity-80">PEI Textured Spring Steel Surface</span>
                    </div>
                  </div>
                )}`;

const regex = /\{selectedProject === "jd-union" \? \([\s\S]*?<\/div>\s*\)\}/;
content = content.replace(regex, replacement);
fs.writeFileSync('src/components/CADShowcase.tsx', content);
