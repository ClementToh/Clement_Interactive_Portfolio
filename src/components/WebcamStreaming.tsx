import React, { useState, useEffect } from "react";
import { Video, Activity, RefreshCw, Maximize2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function WebcamStreaming() {
  const [isLive, setIsLive] = useState(true);
  const [frameTime, setFrameTime] = useState(Date.now());

  // Simulate frame updates
  useEffect(() => {
    let interval: any;
    if (isLive) {
      interval = setInterval(() => {
        setFrameTime(Date.now());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden font-sans">
      <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-neutral-900 font-bold text-base flex items-center gap-2">
            <Video className="w-5 h-5 text-neutral-500 shrink-0" />
            HTTP Webcam Streaming
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Real-time remote monitoring via custom Python socketserver.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 text-white rounded-lg font-mono text-xs shadow-sm">
            <span className={`w-2 h-2 rounded-full \${isLive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></span>
            {isLive ? "STREAMING" : "OFFLINE"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 bg-neutral-950 p-6 flex flex-col relative min-h-[400px] md:min-h-[500px]">
          <div className="absolute top-8 left-8 right-8 flex justify-between z-10 text-white font-mono text-[10px] pointer-events-none">
            <div className="flex gap-4">
              <span>REC <span className="animate-pulse text-red-500">●</span></span>
              <span>EOS M 290 CHAMBER</span>
            </div>
            <div className="text-right">
              <div>PORT: 8002</div>
              <div>FPS: 29.97</div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-8 z-10 text-white font-mono text-[10px] pointer-events-none">
            <div className="bg-black/50 px-2 py-1 rounded border border-neutral-800">
              TS: {frameTime}
            </div>
          </div>

          <div className="flex-1 border border-neutral-800 rounded-lg overflow-hidden relative flex items-center justify-center bg-neutral-900">
            {/* Simulate camera view */}
            <div className="absolute inset-0 bg-neutral-950 opacity-90 flex items-center justify-center">
               <div className="w-full h-full relative" style={{
                 background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)',
                 backgroundSize: '10px 10px',
                 backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)'
               }}>
                 {/* Laser scanline simulation */}
                 <div 
                   className="absolute left-0 right-0 h-0.5 bg-blue-500/50 shadow-[0_0_10px_#3b82f6]"
                   style={{
                     top: `\${(Math.sin(frameTime / 1000) * 40 + 50)}%`,
                     transition: 'top 1s linear'
                   }}
                 />
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 border border-neutral-800 rounded-full flex items-center justify-center relative">
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-800/50" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-800/50" />
                      <div className="w-4 h-4 rounded-full border border-neutral-600" />
                    </div>
                 </div>
               </div>
            </div>

            {!isLive && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                <div className="text-center space-y-2 font-mono text-neutral-400">
                  <AlertTriangle className="w-8 h-8 mx-auto text-rose-500" />
                  <p>STREAM DISCONNECTED</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-center text-xs">
            <button 
              onClick={() => setIsLive(!isLive)}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-mono transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 \${isLive ? "animate-spin" : ""}`} />
              {isLive ? "Disconnect Stream" : "Connect Stream"}
            </button>
            <button className="p-2 text-neutral-400 hover:text-white cursor-pointer transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 bg-neutral-50 border-l border-neutral-200">
          <div className="space-y-6">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 pb-2 border-b border-neutral-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                System Integration
              </h4>
              <div className="mt-4 space-y-4 font-sans text-xs text-neutral-600 leading-relaxed">
                <p>
                  <strong>Hardware:</strong> Anker PowerConf C200 webcam secured via custom setscrew mount to an external port cover. Selected for 2K resolution capability and integrated thermal shielding to withstand 50°C continuous operation.
                </p>
                <p>
                  <strong>Software Pipeline:</strong> 
                  <code className="block bg-neutral-100 p-2 rounded mt-2 border border-neutral-200 font-mono text-[10px] text-neutral-700">
                    import http.server<br/>
                    import socketserver<br/>
                    <br/>
                    PORT = 8002<br/>
                    Handler = MyHttpRequestHandler<br/>
                    httpd.serve_forever()
                  </code>
                </p>
                <p>
                  <strong>Results:</strong> Established continuous, low-latency visual validation of powder bed fusion layer integrity over localized IP networks. Allowed mechanical engineers to remotely abort failed jobs, saving high-value titanium powder material costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
