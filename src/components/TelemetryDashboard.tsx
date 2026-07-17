import { useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Play, Pause, AlertTriangle, RefreshCw, Cpu, Activity, Sliders, CheckCircle } from "lucide-react";
import { TelemetryData } from "../types";

export default function TelemetryDashboard() {
  const [data, setData] = useState<TelemetryData[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [noiseLevel, setNoiseLevel] = useState(25); // Noise slider %
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [anomalyActive, setAnomalyActive] = useState(false);
  const [anomalyDurationMs, setAnomalyDurationMs] = useState(0);
  const [showAnomalyBanner, setShowAnomalyBanner] = useState(false);
  
  const anomalyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (anomalyTimeoutRef.current) clearTimeout(anomalyTimeoutRef.current);
      if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
    };
  }, []);
  
  const tickRef = useRef(0);

  // Generate initial historical telemetry data
  useEffect(() => {
    const initialData: TelemetryData[] = [];
    for (let i = 0; i < 40; i++) {
      initialData.push(generateTick(i, noiseLevel, filterEnabled, false));
    }
    setData(initialData);
    tickRef.current = 40;
  }, []);

  // Live updating simulation loop
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prev) => {
        const nextTick = tickRef.current++;
        // Generate new tick
        const newPoint = generateTick(
          nextTick,
          noiseLevel,
          filterEnabled,
          anomalyActive
        );

        // Keep 40 points
        const sliced = prev.slice(1);
        return [...sliced, newPoint];
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isLive, noiseLevel, filterEnabled, anomalyActive]);

  // Helper to generate a mechatronics telemetry data point
  function generateTick(
    tick: number,
    noise: number,
    filter: boolean,
    hasAnomaly: boolean
  ): TelemetryData {
    const x = tick * 0.4;
    
    // Base signals (sine wave with some frequency harmonics)
    let vibrationBase = Math.sin(x) * 0.15 + Math.cos(x * 2.3) * 0.05;
    let strainBase = Math.cos(x * 0.8) * 40 + 110;
    let tempBase = 22.0 + Math.sin(x * 0.1) * 1.5;
    let powerBase = 0.0;

    // Apply raw mechanical sensor noise if filter is disabled
    const rawNoiseMultiplier = filter ? 0.05 : 1.0;
    const calculatedNoise = (noise / 100) * rawNoiseMultiplier;
    
    let vNoise = (Math.random() - 0.5) * calculatedNoise * 0.4;
    let sNoise = (Math.random() - 0.5) * calculatedNoise * 35;
    let tNoise = (Math.random() - 0.5) * calculatedNoise * 1.2;
    let pNoise = (Math.random() - 0.5) * calculatedNoise * 0.2;

    let vibration = vibrationBase + vNoise;
    let strain = strainBase + sNoise;
    let temperature = tempBase + tNoise;
    let laserPower = powerBase + pNoise;

    // Inject physical mechatronic anomalies
    let anomalyDetected = false;
    if (hasAnomaly) {
      // High vibration spike & severe shear strain as blade jams on uneven powder
      vibration += 1.85 + Math.random() * 0.3;
      strain += 280 + Math.random() * 40;
      anomalyDetected = true;
    }

    // Keep logical bounds
    return {
      time: tick,
      vibration: parseFloat(vibration.toFixed(3)),
      strain: parseFloat(strain.toFixed(1)),
      temperature: parseFloat(temperature.toFixed(2)),
      laserPower: parseFloat(Math.max(0, laserPower).toFixed(2)),
      anomalyDetected
    };
  }

  const triggerAnomaly = () => {
    if (anomalyTimeoutRef.current) clearTimeout(anomalyTimeoutRef.current);
    if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);

    setAnomalyActive(true);
    setShowAnomalyBanner(true);
    setAnomalyDurationMs(0);
    
    anomalyTimeoutRef.current = setTimeout(() => {
      setAnomalyActive(false);
      bannerTimeoutRef.current = setTimeout(() => {
        setShowAnomalyBanner(false);
      }, 7000);
    }, 4500);
  };

  useEffect(() => {
    if (!anomalyActive) return;
    const start = Date.now();
    const interval = setInterval(() => {
      setAnomalyDurationMs(Date.now() - start);
    }, 50);
    return () => clearInterval(interval);
  }, [anomalyActive]);

  // Source code templates displayed dynamically based on injected failure modes
  const codeSnippet = anomalyActive 
    ? `// TRIGGER DETECTED: Shear Strain > THRESHOLD (Channel 4)
// Executing emergency shutter lock & build pause...
void inject_anomaly_interrupt() {
  digitalWrite(SHUTTER_PIN, LOW);
  serial_tx("ERR_RECOATER_JAM");
  halt_axis(Z_AXIS);
}`
    : `// C++/Platform.io Real-time Recoater Anomaly Filter
#define SAMPLING_RATE_HZ 2000
#define VIBRATION_THRESHOLD_UM 1.20
#define STRAIN_THRESHOLD_MSTR 250.0

void loop() {
  float current_strain = read_daq_channel(4);
  if (current_strain > STRAIN_THRESHOLD_MSTR) {
     trigger_hardware_interrupt(0x01);
  }
}`;

  return (
    <div id="telemetry-dashboard" className="bg-neutral-900 text-neutral-100 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden font-sans">
      {/* Header Bar */}
      <div className="px-6 py-4 bg-neutral-950/70 border-b border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-3 w-3">
            {isLive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${anomalyActive ? "bg-red-500" : isLive ? "bg-emerald-500" : "bg-neutral-500"}`}></span>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold tracking-wider text-neutral-200 uppercase flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
              Live Laboratory Instrumentation Bench
            </h3>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">DAQ Device: NI-9236 (Ethernet Connection Active)</p>
          </div>
        </div>

        {/* Project Selector Toggles */}
        <div className="flex bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg text-xs font-mono">
          <button
            className="px-3 py-1.5 rounded-md transition-all cursor-default bg-neutral-800 text-white font-medium border border-neutral-700/50 shadow"
          >
            A*STAR: EOS M 290 Telemetry
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col gap-6 p-6">
        
        {/* Full-width Graph */}
        <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 w-full relative">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              12-Channel Microstrain & Recoater Displacement
            </h4>
            <span className="font-mono text-[10px] text-neutral-500">Unit: Microstrain (με) / Temperature (°C)</span>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis dataKey="time" stroke="#525252" fontSize={10} fontClassName="font-mono" />
                <YAxis stroke="#525252" fontSize={10} fontClassName="font-mono" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0a0a0a", borderColor: "#262626", borderRadius: "8px", fontFamily: "monospace" }}
                  labelStyle={{ color: "#737373", fontSize: "10px" }}
                />
                <Legend wrapperStyle={{ fontFamily: "monospace", fontSize: "10px" }} />
                
                <Line
                  type="monotone"
                  dataKey="strain"
                  name="Strain Gauge 4 (με)"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="vibration"
                  name="Laser Vibrometer (μm)"
                  stroke="#10b981"
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {showAnomalyBanner && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-red-950/90 border border-red-500/50 text-red-400 font-mono text-xs px-3 py-2 rounded-lg z-20 flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>ANOMALY DETECTED: {(anomalyDurationMs / 1000).toFixed(2)}s</span>
            </div>
          )}
          {/* Controls overlaid at bottom right */}
          <div className="absolute bottom-5 right-5 flex gap-2 z-10">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${isLive ? "bg-amber-600/20 text-amber-300 border border-amber-600/40 hover:bg-amber-600/30" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}
            >
              {isLive ? (
                <>
                  <Pause className="w-3.5 h-3.5 shrink-0" /> Pause Stream
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 shrink-0" /> Resume Stream
                </>
              )}
            </button>
            <button
              onClick={() => {
                const initialData = [];
                for (let i = 0; i < 40; i++) {
                  initialData.push(generateTick(i, noiseLevel, filterEnabled, false));
                }
                setData(initialData);
                tickRef.current = 40;
                setAnomalyActive(false);
                setShowAnomalyBanner(false);
                if (anomalyTimeoutRef.current) clearTimeout(anomalyTimeoutRef.current);
                if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
              }}
              className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-lg text-xs font-mono transition-colors cursor-pointer"
              title="Reset Buffer"
            >
              <RefreshCw className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Telemetry/Code Synchronization Console */}
          <div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-neutral-900 border-b border-neutral-800 flex justify-between items-center">
              <span className="font-mono text-[11px] text-neutral-400 uppercase flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                Active Validation Software Pipeline
              </span>
              <span className="font-mono text-[9px] text-neutral-500">Language: C++ / Platform.io</span>
            </div>
            
            <div className="p-4 bg-neutral-950 font-mono text-[11px] leading-relaxed text-neutral-300 overflow-x-auto h-full min-h-[200px]">
              <pre className="text-left whitespace-pre">{codeSnippet}</pre>
            </div>
          </div>

          {/* Failure Injection Card */}
          <div className="bg-gradient-to-br from-neutral-950 to-red-950/20 p-5 rounded-xl border border-red-900/50 shadow-[0_0_15px_rgba(220,38,38,0.15)] relative overflow-hidden group hover:border-red-500/50 transition-all duration-500 flex flex-col">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
              <button
                onClick={() => triggerAnomaly()}
                disabled={anomalyActive || !isLive}
                className="relative z-10 py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white border border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] disabled:opacity-40 disabled:cursor-not-allowed text-[10px] sm:text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest"
              >
                <Cpu className="w-4 h-4 text-white animate-ping absolute opacity-30" /><Cpu className="w-4 h-4 text-white relative z-10" />
                Inject Recoater Blade Jam (~50μm bed spike)
              </button>
              <div className="bg-neutral-900/60 px-2.5 py-1 rounded border border-neutral-800/80 text-right hidden sm:block">
                <span className="text-[9px] text-neutral-500 block uppercase leading-tight">Sampling Rate</span>
                <span className="text-xs font-mono font-semibold text-neutral-200 mt-0.5 block leading-tight">2,000 Hz</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-5">
              Inject active failures to test my telemetry pipelines. Detect mechanical jams, and shut down before printing structure warp.
            </p>
            {anomalyActive && (
              <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-xs font-mono text-red-300 flex items-start gap-2 animate-bounce mt-4">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">ANOMALY TRIGGERED!</span>
                  <p className="text-[10px] text-red-400/90 mt-0.5 leading-normal">
                    High-frequency shear strain spiked on NI-9236 channel 4. Shutter state locked.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
            
    </div>
  );
}