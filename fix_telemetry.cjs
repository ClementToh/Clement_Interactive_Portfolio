const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

const brokenIndex = content.indexOf('<div className="p-6 pt-0">');
content = content.substring(0, brokenIndex);

const fullConsole = `      <div className="p-6 pt-0">
        {/* Telemetry/Code Synchronization Console */}
        <div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col">
          <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 flex justify-between items-center">
            <span className="font-mono text-[11px] text-neutral-400 uppercase flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
              Active Validation Software Pipeline
            </span>
            <span className="font-mono text-[9px] text-neutral-500">Language: C++ / Platform.io</span>
          </div>
          
          <div className="p-4 bg-neutral-950 font-mono text-[11px] leading-relaxed text-neutral-300 overflow-x-auto max-h-56">
            <pre className="text-left whitespace-pre">{codeSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/TelemetryDashboard.tsx', content + fullConsole);
