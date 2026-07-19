const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

// We want to replace the whole `selectedProject === "jd-union" ? (...) : (...)` block with just the 3D viewer for jd-union, and maybe placeholders for others.

let replacement = `                {selectedProject === "jd-union" ? (
                  <ErrorBoundary fallbackRender={({ error: err }) => (
                    <div className="text-rose-500 font-mono text-xs text-center">
                      3D Model Error: {err?.message || "Unknown error"}
                    </div>
                  )}>
                    <div className="w-full h-full flex flex-col items-center justify-center relative z-10" style={{ height: "100%", width: "100%", minHeight: "350px" }}>
                      <div className="absolute top-2 right-2 z-20 bg-neutral-900/80 px-2 py-1 text-[10px] font-mono text-neutral-400 border border-neutral-700 rounded shadow-md pointer-events-none">
                        Drag to rotate | Scroll to zoom
                      </div>
                      <Suspense fallback={<div className="text-neutral-500 font-mono text-xs">Loading 3D Model...</div>}>
                        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }} style={{ width: "100%", height: "100%", minHeight: "350px" }}>
                          <ambientLight intensity={1} />
                          <directionalLight position={[10, 10, 10]} intensity={2} />
                          <Bounds fit clip observe margin={1.2}>
                            <Center>
                              <Model url="/movable_laser_station_uncompressed.glb" />
                            </Center>
                          </Bounds>
                          <OrbitControls makeDefault autoRotate autoRotateSpeed={1.5} />
                        </Canvas>
                      </Suspense>
                    </div>
                  </ErrorBoundary>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4 text-neutral-600 font-mono text-xs h-full w-full opacity-50">
                    <p>Interactive CAD preview not available for this project.</p>
                  </div>
                )}`;

content = content.replace(/\{selectedProject === "jd-union" \? \([\s\S]*?\)\}              <\/div>\s*<\/div>\s*<\/div>/, replacement + '\n              </div>\n            </div>\n          </div>');

fs.writeFileSync('src/components/CADShowcase.tsx', content);
