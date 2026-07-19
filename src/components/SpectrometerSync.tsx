import React, { useState, useEffect } from "react";
import { Activity, Play, Pause, Database, Cpu, Search } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function SpectrometerSync() {
  const [isRunning, setIsRunning] = useState(true);
  const [data, setData] = useState<{ time: number; val: number }[]>([]);
  const [packetCount, setPacketCount] = useState(16558);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setData(prev => {
          const newData = [...prev];
          if (newData.length > 50) newData.shift();
          
          const time = Date.now();
          // Simulate the "saw tooth" kinematic pattern of the recoater blade as described in the PDF
          const val = (time % 10000) / 10000 * 250 + (Math.random() * 20 - 10);
          
          newData.push({ time, val });
          return newData;
        });
        setPacketCount(c => c + Math.floor(Math.random() * 15));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden font-sans">
      <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-neutral-900 font-bold text-base flex items-center gap-2">
            <Activity className="w-5 h-5 text-neutral-500 shrink-0" />
            EPL V2 Packet Kinematic Sync
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Reverse-engineering Industrial PC packet streams to trigger optical spectrometer.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 transition-colors text-white rounded-lg font-mono text-xs shadow-sm cursor-pointer"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? "PAUSE PARSER" : "RESUME PARSER"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 p-6 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Node ID 2 (Recoater Blade Servomotor)
              </div>
              <div className="text-2xl font-mono font-bold text-neutral-800">
                {data.length > 0 ? data[data.length - 1].val.toFixed(2) : "0.00"} <span className="text-sm text-neutral-400 font-sans">Pos</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Captured Packets (Downsampled)
              </div>
              <div className="text-lg font-mono font-bold text-indigo-600">
                {packetCount.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[250px] bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  tickFormatter={() => ""} 
                  stroke="#a3a3a3" 
                  tick={{fontSize: 10, fill: '#737373'}}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#a3a3a3" 
                  tick={{fontSize: 10, fill: '#737373', fontFamily: 'monospace'}}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 300]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#818cf8' }}
                  labelStyle={{ display: 'none' }}
                  formatter={(value: any) => [`\${Number(value).toFixed(2)}`, 'Position']}
                />
                <Line 
                  type="linear" 
                  dataKey="val" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-neutral-400">
            <div className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5" />
              INFLUXDB CROSS-CHECK: VERIFIED
            </div>
            <div>
              SAW-TOOTH KINEMATIC PATTERN MATCH
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 bg-neutral-950 text-neutral-300 border-l border-neutral-800">
          <div className="space-y-6">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 pb-2 border-b border-neutral-800 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-indigo-400" />
                Data Pipeline Logic
              </h4>
              <div className="mt-4 space-y-4 font-sans text-xs text-neutral-400 leading-relaxed">
                <p>
                  <strong className="text-neutral-200">The Problem:</strong> The Firefly4000 optical spectrometer needed to trigger exactly when the EOS M 290's recoater blade was strictly stationary to prevent motion-blurred optical plasma emission signatures.
                </p>
                <p>
                  <strong className="text-neutral-200">The Solution:</strong> Hardware-tapped the proprietary Industrial PC (IPC) network using a Python Scapy pipeline to sniff millions of Ethernet Powerlink V2 packets over a 30-hour print. 
                </p>
                
                <div className="bg-neutral-900 border border-neutral-800 rounded p-3 font-mono text-[10px] space-y-2">
                  <div className="text-indigo-400 mb-1">RAW HEX STRING (EPL V2)</div>
                  <div className="truncate opacity-50">1672990662 | Node 2 | 1433... 41 4 ... 53</div>
                  <div className="truncate opacity-50">1672990662 | Node 40 | 9239... 33 56 ... 85</div>
                  <div className="text-emerald-400 mt-2">DOWNSAMPLED & PARSED</div>
                  <div className="text-white">Node 2 → Servomotor (Recoater)</div>
                </div>

                <p>
                  <strong className="text-neutral-200">Outcome:</strong> Successfully isolated the recoater blade coordinates (Node ID 2) from raw hex strings by matching the data against an InfluxDB physical telemetry map. This created a synchronized microsecond trigger for the digital shutter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
