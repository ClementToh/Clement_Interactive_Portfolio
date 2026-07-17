import React, { useState, Suspense, ErrorInfo, ReactNode } from "react";
import { PROJECTS } from "../data";
import { Layers, Settings, Eye, HelpCircle, HardDrive, Thermometer, Box } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Stage, Bounds, useGLTF } from "@react-three/drei";

class ErrorBoundary extends React.Component<{ fallback: any; children: ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("GLTF Error:", error, info); }
  render() {
    if (this.state.hasError) return typeof this.props.fallback === "function" ? this.props.fallback(this.state.error) : this.props.fallback;
    return this.props.children;
  }
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}


export default function CADShowcase() {
  const [selectedProject, setSelectedProject] = useState("jd-union");
  const [exploded, setExploded] = useState(false);
  const [activePart, setActivePart] = useState<string | null>(null);

  const project = PROJECTS.find((p) => p.id === selectedProject) || PROJECTS[0];
  const cadData = project.cadInteractiveData;

  return (
    <div id="cad-showcase" className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden font-sans">
      
      {/* Header */}
      <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-neutral-900 font-bold text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-neutral-500 shrink-0" />
            CAD Assembly & DFM Specifications
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Explore the mechanical design parameters and structural dimension constraints.</p>
        </div>

        {/* Project select */}
        <div className="flex bg-neutral-100 p-0.5 rounded-lg text-xs font-mono">
          <button
            onClick={() => { setSelectedProject("jd-union"); setActivePart(null); }}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${selectedProject === "jd-union" ? "bg-white text-neutral-900 font-semibold shadow-sm" : "text-neutral-500 hover:text-neutral-900"}`}
          >
            Laser Workstation
          </button>
          <button
            onClick={() => { setSelectedProject("astar-iiot"); setActivePart(null); }}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${selectedProject === "astar-iiot" ? "bg-white text-neutral-900 font-semibold shadow-sm" : "text-neutral-500 hover:text-neutral-900"}`}
          >
            EOS M 290 Passthrough
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Visual Assembly Canvas Mock (7 cols) */}
        <div className="lg:col-span-7 bg-neutral-950 p-6 relative flex flex-col justify-between min-h-[400px]">
          
          {/* Top telemetry specs */}
          <div className="flex justify-between font-mono text-[10px] text-neutral-500">
            <span>UNITS: MILLIMETERS (MM)</span>
            <span>SYSTEM ASSEMBLY RIGIDITY: {cadData?.vibrationSpec}</span>
          </div>

          {/* Interactive exploded animation view */}
          <div className="flex-1 flex flex-col items-center justify-center relative py-10">
            {/* Visual Assembly representation */}
            <div className="relative w-full h-full min-h-[350px] border border-neutral-850 bg-neutral-950/20 rounded-xl flex flex-col items-center justify-center p-0 overflow-hidden shadow-inner">
              
              {/* Background vector lines simulating a grid blueprint */}
              <div className="absolute inset-0 pixel-grid opacity-10"></div>
              
              {/* Custom Blueprint lines to look like engineering drawing */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-600 border-l border-t border-neutral-800 p-1">
                3RD ANGLE PROJECTION
              </div>

              {/* Dynamic Exploded representation based on projects */}
              <div className="w-full h-full flex flex-col items-center relative z-10">
                {selectedProject === "jd-union" ? (
                  <ErrorBoundary fallback={(error: any) => (
                  <div className="space-y-3 w-48 transition-all duration-500 relative z-10">
                    <div className="absolute -top-8 left-0 right-0 text-[9px] text-rose-400 font-mono text-center bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                      3D Model Error: {error?.message || "Unknown error"}
                    </div>
                    {/* Laser optic core */}
                    <div
                      onClick={() => setActivePart("IPG Ytterbium Fibre laser")}
                      className={`p-2.5 rounded border text-center transition-all cursor-pointer ${
                        exploded ? "translate-y-[-24px] rotate-1 scale-105" : ""
                      } ${
                        activePart === "IPG Ytterbium Fibre laser"
                          ? "bg-rose-500 text-white border-rose-400 font-semibold shadow-lg shadow-rose-900/30"
                          : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-rose-500 hover:text-white"
                      }`}
                    >
                      <span className="font-mono text-xs block">Laser Optic Assembly</span>
                      <span className="text-[9px] block opacity-80">IPG Fibre Source + QBH Head</span>
                    </div>
                    {/* Precision motion XY stage */}
                    <div
                      onClick={() => setActivePart("Optomechanical XY Stage")}
                      className={`p-2 rounded border text-center transition-all cursor-pointer ${
                        exploded ? "translate-y-[-8px] scale-102" : ""
                      } ${
                        activePart === "Optomechanical XY Stage"
                          ? "bg-blue-500 text-white border-blue-400 font-semibold shadow-lg shadow-blue-900/30"
                          : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-blue-500 hover:text-white"
                      }`}
                    >
                      <span className="font-mono text-xs block">Precision Kinematics</span>
                      <span className="text-[9px] block opacity-80">Optomechanical Galvanometer</span>
                    </div>
                    {/* Aluminum chassis frame */}
                    <div
                      onClick={() => setActivePart("Constrained 4040 Al Chassis")}
                      className={`p-3 rounded border text-center transition-all cursor-pointer ${
                        exploded ? "translate-y-[12px] rotate-[-1deg] scale-98" : ""
                      } ${
                        activePart === "Constrained 4040 Al Chassis"
                          ? "bg-emerald-500 text-white border-emerald-400 font-semibold shadow-lg shadow-emerald-900/30"
                          : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-emerald-500 hover:text-white"
                      }`}
                    >
                      <span className="font-mono text-xs block">Vibration Isolated Frame</span>
                      <span className="text-[9px] block opacity-80">Constrained 4040 Aluminum Extrusion</span>
                    </div>
                    {/* Chiller / Cooling system */}
                    <div
                      onClick={() => setActivePart("Dual-Chamber Chiller Routing")}
                      className={`p-2 rounded border text-center transition-all cursor-pointer ${
                        exploded ? "translate-y-[28px] scale-95" : ""
                      } ${
                        activePart === "Dual-Chamber Chiller Routing"
                          ? "bg-amber-500 text-white border-amber-400 font-semibold shadow-lg shadow-amber-900/30"
                          : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-amber-500 hover:text-white"
                      }`}
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
                ) : (
                  /* A*STAR Passthrough layers */
                  <div className="space-y-4 w-48 transition-all duration-500">
                    
                    {/* Argon seal */}
                    <div
                      onClick={() => setActivePart("M5Stack Core2 Edge Device")}
                      className={`p-2 rounded border text-center transition-all cursor-pointer ${
                        exploded ? "translate-y-[-20px] scale-105" : ""
                      } ${
                        activePart === "M5Stack Core2 Edge Device"
                          ? "bg-violet-500 text-white border-violet-400 font-semibold shadow-lg shadow-violet-900/30"
                          : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-violet-500 hover:text-white"
                      }`}
                    >
                      <span className="font-mono text-xs block">Telemetry Edge Node</span>
                      <span className="text-[9px] block opacity-80">M5Stack ESP32 Edge Device</span>
                    </div>

                    {/* Hermetic collar plate */}
                    <div
                      onClick={() => setActivePart("NI-9236 Strain Gauge Module")}
                      className={`p-3 rounded border text-center transition-all cursor-pointer ${
                        exploded ? "translate-y-[0px]" : ""
                      } ${
                        activePart === "NI-9236 Strain Gauge Module"
                          ? "bg-blue-500 text-white border-blue-400 font-semibold shadow-lg shadow-blue-900/30"
                          : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-blue-500 hover:text-white"
                      }`}
                    >
                      <span className="font-mono text-xs block">13mm Hermetic Passthrough</span>
                      <span className="text-[9px] block opacity-80">Sealed Flange Collar (Stainless Steel)</span>
                    </div>

                    {/* Argon atmosphere vacuum chamber */}
                    <div
                      onClick={() => setActivePart("Grafana Web Interface")}
                      className={`p-2 rounded border text-center transition-all cursor-pointer ${
                        exploded ? "translate-y-[20px] scale-95" : ""
                      } ${
                        activePart === "Grafana Web Interface"
                          ? "bg-emerald-500 text-white border-emerald-400 font-semibold shadow-lg shadow-emerald-900/30"
                          : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-emerald-500 hover:text-white"
                      }`}
                    >
                      <span className="font-mono text-xs block">Active Vacuum Core</span>
                      <span className="text-[9px] block opacity-80">EOS Printer Argon Chamber Integrity</span>
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Bottom control row */}
          <div className="flex justify-between items-center bg-neutral-900/80 p-3 rounded-lg border border-neutral-800 font-mono text-[11px]">
            <span className="text-neutral-400">Total Weight: <span className="text-neutral-200 font-bold">{cadData?.assemblyWeight}</span></span>
            <button
              onClick={() => setExploded(!exploded)}
              className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-750 rounded transition-colors text-xs cursor-pointer"
            >
              {exploded ? "Collapse Assembly" : "Explode Assembly Layout"}
            </button>
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
                  {activePart.includes("laser") && (
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
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 space-y-3">
                <div className="p-3 bg-neutral-100 text-neutral-400 rounded-full">
                  <Eye className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-neutral-800 font-bold text-sm">Select an Assembly Part</p>
                  <p className="text-neutral-500 text-xs max-w-xs leading-relaxed">
                    Click any element of the CAD blueprint on the left to view materials, tolerances, DFM criteria, and vibration constraints.
                  </p>
                </div>
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

useGLTF.preload("/movable_laser_station_uncompressed.glb");
