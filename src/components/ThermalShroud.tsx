import React from "react";
import { Thermometer, Wind, Maximize2, AlertCircle } from "lucide-react";

export default function ThermalShroud() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden font-sans">
      <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-neutral-900 font-bold text-base flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-neutral-500 shrink-0" />
            Thermal Shroud & Fluid Dynamics
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Laminar airflow shroud and thermal management breakdown.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 bg-neutral-950 p-6 flex flex-col relative min-h-[400px]">
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-70">
            {/* Mock thermal visualization */}
            <div className="w-full max-w-lg h-64 bg-gradient-to-r from-blue-600 via-indigo-500 to-rose-500 rounded-lg blur-3xl opacity-20 absolute" />
            <div className="relative z-10 w-full max-w-md border border-neutral-800 rounded-xl bg-neutral-900/80 p-8 text-center backdrop-blur-sm">
              <Thermometer className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <div className="text-3xl font-mono text-white mb-2">350°C <span className="text-sm text-neutral-400">Peak Load</span></div>
              <p className="text-xs text-neutral-400 font-mono">HEAT DISSIPATION ANALYSIS</p>
              
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-neutral-500">Intake Airflow (Laminar)</span>
                  <span className="text-blue-400">2.5 m/s</span>
                </div>
                <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-2/3" />
                </div>
                
                <div className="flex justify-between text-xs font-mono mt-4">
                  <span className="text-neutral-500">Exhaust Temp</span>
                  <span className="text-rose-400">85°C</span>
                </div>
                <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[85%]" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto relative z-20 flex justify-between items-center text-xs">
            <div className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded font-mono flex items-center gap-2">
              <Wind className="w-4 h-4 text-blue-400" />
              CFD SIMULATION COMPLETED
            </div>
            <button className="p-2 text-neutral-400 hover:text-white transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 bg-neutral-50 border-l border-neutral-200">
          <div className="space-y-6">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 pb-2 border-b border-neutral-200 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                Thermal Parameters
              </h4>
              <div className="mt-4 space-y-4 font-sans text-xs text-neutral-600 leading-relaxed">
                <p>
                  <strong>Objective:</strong> Design a sheet metal thermal shroud to redirect turbulent exhaust heat away from the sensitive optical arrays, maintaining the ambient temperature below 50°C.
                </p>
                <p>
                  <strong>Computational Fluid Dynamics (CFD):</strong> Utilized SOLIDWORKS Flow Simulation to model the laminar flow paths. Identified high-pressure zones and optimized the louvre angles to 35 degrees.
                </p>
                <p>
                  <strong>Results:</strong> Achieved a 40% reduction in peak temperature at the optical sensor mount point, preventing thermal drift and guaranteeing continuous reliable operation of the EOS M 290 modifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
