const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

const regex = /<div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">[\s\S]*?\{anomalyActive && \(/;

const match = content.match(regex);
if (match) {
    const replacement = `<div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
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
            {anomalyActive && (`;
    
    content = content.replace(match[0], replacement);
    fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
    console.log("Success");
} else {
    console.log("Match not found");
}
