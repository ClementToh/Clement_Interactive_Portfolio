const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

const regex = /\{\/\* Main Grid \*\/\}[\s\S]*?(?=\s*<\/div>\s*<\/div>\s*\);)/;

const match = content.match(regex);
if (!match) {
    console.error("Could not find the Main Grid content");
    process.exit(1);
}

const replacement = `{/* Main Container */}
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

          {/* Controls overlaid at bottom right */}
          <div className="absolute bottom-5 right-5 flex gap-2 z-10">
            <button
              onClick={() => setIsLive(!isLive)}
              className={\`px-4 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer \${isLive ? "bg-amber-600/20 text-amber-300 border border-amber-600/40 hover:bg-amber-600/30" : "bg-emerald-600 text-white hover:bg-emerald-700"}\`}
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
              <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Isolate Mechanical Anomalies
              </h4>
              <div className="bg-neutral-900/60 px-2.5 py-1 rounded border border-neutral-800/80 text-right">
                <span className="text-[9px] text-neutral-500 block uppercase leading-tight">Sampling Rate</span>
                <span className="text-xs font-mono font-semibold text-neutral-200 mt-0.5 block leading-tight">2,000 Hz</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-5">
              Inject active failures to test my telemetry pipelines. Detect mechanical jams, and shut down before printing structure warp.
            </p>
            <div className="space-y-2 mt-auto">
              <button
                onClick={() => triggerAnomaly()}
                disabled={anomalyActive || !isLive}
                className="relative z-10 w-full py-3 bg-red-600 hover:bg-red-500 text-white border border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest"
              >
                <Cpu className="w-4 h-4 text-white animate-ping absolute opacity-30" /><Cpu className="w-4 h-4 text-white relative z-10" />
                Inject Recoater Blade Jam (~50μm bed spike)
              </button>
            </div>
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

        </div>`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
