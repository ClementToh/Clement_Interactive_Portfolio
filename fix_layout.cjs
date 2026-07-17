const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

const failureIndex = content.indexOf('          {/* Failure Injection Card */}');
const rechartsIndex = content.indexOf('        {/* Recharts Chart Grid (right 8) */}');
const failureCardRaw = content.substring(failureIndex, rechartsIndex);

const consoleIndex = content.indexOf('          {/* Telemetry/Code Synchronization Console */}');
const consoleEndIndex = content.indexOf('        </div>', consoleIndex);
const consoleCardRaw = content.substring(consoleIndex, consoleEndIndex);

// Remove failure from left column
let newContent = content.substring(0, failureIndex) + content.substring(rechartsIndex);

// Re-index after modifying
const newConsoleIndex = newContent.indexOf('          {/* Telemetry/Code Synchronization Console */}');
const newConsoleEndIndex = newContent.indexOf('        </div>\n\n      </div>\n    </div>\n  );\n}');

// Replace console with failure card inside the right column
let enhancedFailureCard = failureCardRaw.replace(
  '<div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-4">',
  '<div className="bg-gradient-to-br from-neutral-950 to-red-950/20 p-5 rounded-xl border border-red-900/50 space-y-4 shadow-[0_0_15px_rgba(220,38,38,0.15)] relative overflow-hidden group hover:border-red-500/50 transition-all duration-500 flex-none">'
);
enhancedFailureCard = enhancedFailureCard.replace(
  'className="w-full py-2.5 bg-red-950/40 text-red-300 hover:bg-red-950/60 border border-red-900/60 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"',
  'className="relative z-10 w-full py-3 bg-red-600 hover:bg-red-500 text-white border border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest"'
);
enhancedFailureCard = enhancedFailureCard.replace(
  '<Cpu className="w-3.5 h-3.5 text-red-400 animate-pulse" />',
  '<Cpu className="w-4 h-4 text-white animate-ping absolute opacity-30" /><Cpu className="w-4 h-4 text-white relative z-10" />'
);
// Remove trailing '        </div>\n\n' from failureCardRaw
enhancedFailureCard = enhancedFailureCard.replace('        </div>\n\n', '');

const mainContent = newContent.substring(0, newConsoleIndex) + enhancedFailureCard;
const tailContent = newContent.substring(newConsoleEndIndex + 17); // skip '        </div>\n\n'

// Add the console component AT THE END, below the grid
let finalContent = mainContent + '        </div>\n\n      </div>\n      <div className="p-6 pt-0">\n        ' + consoleCardRaw.trim().split('\n').join('\n        ') + '\n      </div>\n    </div>\n  );\n}';

fs.writeFileSync('src/components/TelemetryDashboard.tsx', finalContent);
