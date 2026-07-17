const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const regex = /\{selectedProject === "jd-union" \? \([\s\S]*?\/\* A\*STAR Passthrough layers \*\//;

const replacement = `{selectedProject === "jd-union" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center relative z-10" style={{ height: "100%", width: "100%", minHeight: "350px" }}>
                    <div className="absolute top-2 right-2 z-20 bg-neutral-900/80 px-2 py-1 text-[10px] font-mono text-neutral-400 border border-neutral-700 rounded shadow-md pointer-events-none">
                      Drag to rotate | Scroll to zoom
                    </div>
                    <ErrorBoundary fallback={
                      <div className="flex flex-col items-center justify-center text-neutral-500 font-mono text-xs gap-3 p-6 text-center">
                        <Box className="w-10 h-10 opacity-50" />
                        <p>Missing GLB File</p>
                        <p className="text-[10px] text-neutral-600 max-w-[200px]">
                          Upload your SolidWorks assembly as a .glb file to the public directory to view it here in 3D.
                        </p>
                      </div>
                    }>
                      <Suspense fallback={<div className="text-neutral-500 font-mono text-xs">Loading 3D Model...</div>}>
                        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: "100%", height: "100%", minHeight: "350px" }}>
                          <Stage environment="city" intensity={0.5}>
                            <Model url="/movable_laser_station.glb" />
                          </Stage>
                          <OrbitControls makeDefault autoRotate autoRotateSpeed={1.5} />
                        </Canvas>
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                ) : (
                  /* A*STAR Passthrough layers */`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/components/CADShowcase.tsx', content);
  console.log("Success");
} else {
  console.log("No match found!");
}
