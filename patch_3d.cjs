const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

// 1. Add imports
const imports = `import React, { useState, Suspense, ErrorInfo, ReactNode } from "react";
import { PROJECTS } from "../data";
import { Layers, Settings, Eye, HelpCircle, HardDrive, Thermometer, Box } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

class ErrorBoundary extends React.Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("GLTF Error:", error, info); }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}
`;

content = content.replace(/import \{ useState \} from "react";\nimport \{ PROJECTS \} from "\.\.\/data";\nimport \{ Layers, Settings, Eye, HelpCircle, HardDrive, Thermometer \} from "lucide-react";/, imports);

// 2. Replace JD Union layer with 3D viewer
const jdUnionRegex = /\{selectedProject === "jd-union" \? \([\s\S]*?\/\* EOS M 290 layers \*\//;

const replacement = `{selectedProject === "jd-union" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center relative z-10" style={{ height: "100%", width: "100%", minHeight: "300px" }}>
                    <div className="absolute top-2 right-2 z-20 bg-neutral-900/80 px-2 py-1 text-[10px] font-mono text-neutral-400 border border-neutral-700 rounded shadow-md pointer-events-none">
                      Drag to rotate | Scroll to zoom
                    </div>
                    <ErrorBoundary fallback={
                      <div className="flex flex-col items-center justify-center text-neutral-500 font-mono text-xs gap-3 p-6 text-center">
                        <Box className="w-10 h-10 opacity-50" />
                        <p>Missing GLB File</p>
                        <p className="text-[10px] text-neutral-600 max-w-[200px]">
                          Upload your SolidWorks assembly as a .glb file named <strong>"model.glb"</strong> to the public directory to view it here in 3D.
                        </p>
                      </div>
                    }>
                      <Suspense fallback={<div className="text-neutral-500 font-mono text-xs">Loading 3D Model...</div>}>
                        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: "100%", height: "100%" }}>
                          <Stage environment="city" intensity={0.5}>
                            <Model url="/model.glb" />
                          </Stage>
                          <OrbitControls makeDefault autoRotate autoRotateSpeed={1.5} />
                        </Canvas>
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                ) : (
                  /* EOS M 290 layers */`;

content = content.replace(jdUnionRegex, replacement);

fs.writeFileSync('src/components/CADShowcase.tsx', content);
console.log("Success");
