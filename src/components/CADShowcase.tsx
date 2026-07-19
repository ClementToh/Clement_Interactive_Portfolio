import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Bounds, Center } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import { Layers, Settings, Eye, HelpCircle, HardDrive } from "lucide-react";
import { PROJECTS } from "../data";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function CADShowcase() {
  const [exploded, setExploded] = useState(false);
  const [activePart, setActivePart] = useState<string | null>(null);

  // We get the selected project here. Since this is an interactive demo, we default to jd-union.
  const selectedProject = "jd-union";
  const project = PROJECTS.find((p) => p.id === "jd-union") || PROJECTS[0];
  const cadData = project.cadInteractiveData;

  const headerDetails = { title: "CAD Assembly & DFM Specifications", sub: "Explore mechanical design parameters and structural dimension constraints." };

  return (
    <div id="cad-showcase" className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden font-sans">
      
      {/* Header */}
      <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-neutral-900 font-bold text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-neutral-500 shrink-0" />
            {headerDetails.title}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">{headerDetails.sub}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* CAD Viewer Panel (7 cols) */}
        <div className="lg:col-span-7 bg-neutral-950 p-6 flex flex-col justify-between min-h-[500px]">
          
          {/* Top spec row */}
          <div className="flex justify-between font-mono text-[10px] text-neutral-500">
            <span>UNITS: MILLIMETERS (MM)</span>
            <span>SYSTEM ASSEMBLY RIGIDITY: {cadData?.vibrationSpec}</span>
          </div>

          {/* Interactive exploded animation view */}
          <div className="flex-1 flex flex-col items-center justify-center relative py-10">
            
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Background projection graphics */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-full h-full border border-neutral-800 rounded-lg" style={{ backgroundImage: "radial-gradient(#333 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                <div className="absolute top-10 left-10 w-20 h-20 border-l border-t border-neutral-500"></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-neutral-500"></div>
              </div>
              
              <div className="absolute left-0 top-1/4 text-neutral-600 font-mono text-[9px] uppercase tracking-widest -rotate-90 origin-left">
                3rd Angle Projection
              </div>

              {/* Central 3D Model / Error Boundary */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {selectedProject === "jd-union" ? (
                  <ErrorBoundary fallbackRender={({ error: err }) => (
                    <div className="flex flex-col items-center justify-center space-y-4 w-64 transition-all duration-500 relative z-10">
                      <div className="absolute -top-12 left-0 right-0 text-[9px] text-rose-400 font-mono text-center bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                        3D Model Not Available - Using Fallback
                      </div>
                      <div onClick={() => setActivePart("IPG Ytterbium Fibre laser")} className={`p-3 rounded border text-center transition-all cursor-pointer ${activePart === "IPG Ytterbium Fibre laser" ? "bg-rose-500 text-white border-rose-400 font-semibold shadow-lg shadow-rose-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-rose-500 hover:text-white"}`}>
                        <span className="font-mono text-xs block">Laser Optic Assembly</span>
                        <span className="text-[9px] block opacity-80">IPG Fibre Source + QBH Head</span>
                      </div>
                      <div onClick={() => setActivePart("Constrained 4040 Al Chassis")} className={`p-4 rounded border text-center transition-all cursor-pointer ${activePart === "Constrained 4040 Al Chassis" ? "bg-blue-500 text-white border-blue-400 font-semibold shadow-lg shadow-blue-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-blue-500 hover:text-white"}`}>
                        <span className="font-mono text-xs block">Vibration-Isolated Chassis</span>
                        <span className="text-[9px] block opacity-80">4040 Extruded Aluminium Frame</span>
                      </div>
                      <div onClick={() => setActivePart("Dual-Chamber Chiller Routing")} className={`p-3 rounded border text-center transition-all cursor-pointer ${activePart === "Dual-Chamber Chiller Routing" ? "bg-amber-500 text-white border-amber-400 font-semibold shadow-lg shadow-amber-900/30" : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-amber-500 hover:text-white"}`}>
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
                          <ambientLight intensity={1} />
                          <directionalLight position={[10, 10, 10]} intensity={2} />
                          <Bounds fit clip observe margin={1.2}>
                            <Center>
                              <Model url="/movable_laser_station.glb" />
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
                )}
              </div>

            </div>
          </div>

          {/* Bottom control row */}
          <div className="flex justify-between items-center bg-neutral-900/80 p-3 rounded-lg border border-neutral-800 font-mono text-[11px]">
            <span className="text-neutral-400">Total Weight: <span className="text-neutral-200 font-bold">{cadData?.assemblyWeight}</span></span>
            
          </div>
        </div>

        {/* Spec Details Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-neutral-50 border-l border-neutral-200 min-h-[400px]">
          
          <div className="space-y-6">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 pb-2 border-b border-neutral-200 flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-neutral-500" />
              Bill of Materials & Tolerances
            </h4>

            {activePart ? (
              /* Display details of actively clicked component */
              <div className="space-y-4 animate-fade-in">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    Selected Sub-Component
                  </span>
                  <h5 className="text-neutral-900 font-bold text-lg mt-2 leading-tight">
                    {activePart}
                  </h5>
                </div>

                <div className="space-y-3 font-sans text-xs text-neutral-600">
                  <div className="grid grid-cols-3 py-1.5 border-b border-neutral-200/60">
                    <span className="font-mono text-neutral-400">Sub-System</span>
                    <span className="col-span-2 font-medium text-neutral-800">
                      {cadData?.components.find((c) => c.name === activePart)?.type}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1.5 border-b border-neutral-200/60">
                    <span className="font-mono text-neutral-400">Calibration</span>
                    <span className="col-span-2 text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {cadData?.components.find((c) => c.name === activePart)?.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1.5 border-b border-neutral-200/60">
                    <span className="font-mono text-neutral-400">Design Spec</span>
                    <span className="col-span-2 font-mono text-neutral-800 text-[11px]">
                      {cadData?.components.find((c) => c.name === activePart)?.spec}
                    </span>
                  </div>
                </div>

                {/* Technical mechatronics justification notes */}
                <div className="bg-neutral-100 p-3.5 rounded-lg border border-neutral-200 text-xs text-neutral-600 leading-relaxed space-y-2">
                  <span className="font-semibold text-neutral-900 block flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5" />
                    Mechatronics Integration Logic:
                  </span>
                  {activePart.includes("Chassis") && (
                    <p>Constrained 4040 structural aluminum channels reduce thermal and physical distortion under heavy load cycles. DFM clearances include standard M6 socket-cap screws with locking washers for continuous vibration suppression.</p>
                  )}
                  {activePart.includes("laser") || activePart.includes("LUXINAR") && (
                    <p>High peak power laser source integrated with precision-isolated optical window rings. Protected via positive pressure inert gas purge conduits to eliminate micro-dust settling.</p>
                  )}
                  {activePart.includes("Stage") && (
                    <p>Optomechanical stages mounted directly to CNC-machined reference surfaces. Thermal expansions isolated using low-coefficient Invar adapter blocks to guarantee sub-micron drift stability.</p>
                  )}
                  {activePart.includes("Chiller") && (
                    <p>Dual parallel routing loops separate optical head chiller lines from power supply channels, avoiding cross-coupling thermal pulses during high-frequency micro-processing bursts.</p>
                  )}
                  {activePart.includes("9236") && (
                    <p>A full-bridge strain-gauge bridge (350 ohm) is routed out of the printing chamber using high-flex shielding cables. Eliminates high-current motor EMF coupling noise, securing clean analog signals.</p>
                  )}
                  {activePart.includes("Edge") && (
                    <p>ESP32 edge-node operates custom C++ firmware capturing continuous high-speed analog waveforms. Formulates time-series queries directly onto the industrial ethernet network.</p>
                  )}
                  {activePart.includes("Web") && (
                    <p>Argon atmosphere chamber seal maintained below 0.1% oxygen concentration by utilizing custom fluorocarbon viton compression O-rings in the 13mm hermetic passthrough plate.</p>
                  )}
                  {activePart.includes("Spectrometer") && (
                    <p>The digital shutter trigger is physically mapped to the optical alignment stage. Utilizing TTL microsecond relays to ensure the exposure is completely halted during powder dispensing.</p>
                  )}
                  {activePart.includes("Python") && (
                    <p>Scapy data pipeline converts raw Ethernet POWERLINK binary frames into readable time-series floating points, matching them precisely to motor kinematics for anomaly detection.</p>
                  )}
                  {activePart.includes("Anker") && (
                    <p>High-temperature shielding maintains camera operational integrity inside the hostile print chamber environment. The 15cm USB-C runs straight into the custom PCB port block.</p>
                  )}
                  {activePart.includes("Blower") && (
                    <p>High static pressure blowers feed custom 3D-printed directional ducts. This provides 360-degree laminar part cooling for flawless overhang prints and eliminating ABS warp.</p>
                  )}
                  {activePart.includes("Shroud") && (
                    <p>Lightweight 32g ducting guarantees minimal inertia during high-acceleration toolhead moves (reducing ghosting). Computational fluid dynamics optimized internal geometry.</p>
                  )}
                </div>

                <button
                  onClick={() => setActivePart(null)}
                  className="text-xs text-neutral-500 hover:text-neutral-800 underline font-mono cursor-pointer"
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              /* Prompt to select a part */
              <div className="flex-1 flex flex-col space-y-3 animate-fade-in">
                <p className="text-neutral-500 text-xs mb-2">Select a component to view technical constraints and integration logic:</p>
                {cadData?.components.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePart(c.name)}
                    className="w-full text-left p-3 rounded-lg border border-neutral-200 bg-white hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs font-bold text-neutral-800 group-hover:text-blue-600 transition-colors">{c.name}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 font-mono">{c.type}</span>
                    </div>
                    <span className="text-[10px] text-neutral-500 block line-clamp-1">{c.spec}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-200/60 text-[10px] text-neutral-400 font-mono flex items-center gap-1 justify-center lg:justify-start">
            <HelpCircle className="w-3.5 h-3.5" />
            Vibration limits mapped via continuous real-time FFT.
          </div>
        </div>
      </div>
    </div>
  );
}
useGLTF.preload("/movable_laser_station.glb");
