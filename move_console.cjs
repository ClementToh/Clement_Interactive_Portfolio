const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

const consoleRegex = /[ \t]*<div className="p-6 pt-0">\n[ \t]*\{\/\* Telemetry\/Code Synchronization Console \*\/\}\n[ \t]*<div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col">[\s\S]*?<\/div>\n[ \t]*<\/div>\n[ \t]*<\/div>\n[ \t]*\);\n\}/;

const consoleMatch = content.match(consoleRegex);
if (!consoleMatch) {
    console.error("Could not find Telemetry Console wrapper");
    process.exit(1);
}

// Extract the console code block (without the outer p-6 pt-0 padding wrapper, we'll put it directly in the stack)
const innerConsoleRegex = /[ \t]*\{\/\* Telemetry\/Code Synchronization Console \*\/\}\n[ \t]*<div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col">[\s\S]*?<\/div>\n[ \t]*<\/div>/;

const innerConsoleMatch = consoleMatch[0].match(innerConsoleRegex);
if (!innerConsoleMatch) {
    console.error("Could not find inner Telemetry Console");
    process.exit(1);
}

const innerConsoleCode = innerConsoleMatch[0].replace(/^[ \t]*/gm, '          '); // adjust indentation

// Remove the whole block from the end
let newContent = content.replace(consoleMatch[0], '\n    </div>\n  );\n}');

// Insert into the left column
const insertPoint = '            </div>\n          </div>\n        </div>\n\n        {/* Recharts Chart Grid (right 8) */}';

if (newContent.indexOf(insertPoint) === -1) {
    console.error("Could not find insertion point");
    process.exit(1);
}

const newInsertPoint = '            </div>\n          </div>\n\n' + innerConsoleCode + '\n        </div>\n\n        {/* Recharts Chart Grid (right 8) */}';
newContent = newContent.replace(insertPoint, newInsertPoint);

fs.writeFileSync('src/components/TelemetryDashboard.tsx', newContent);
