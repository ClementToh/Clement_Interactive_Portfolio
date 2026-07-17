const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

const innerConsoleMatch = content.match(/[ \t]*\{\/\* Telemetry\/Code Synchronization Console \*\/\}\n[ \t]*<div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col">[\s\S]*?<\/div>\n[ \t]*<\/div>/);
const innerConsoleCode = innerConsoleMatch[0].split('\n').map(l => '  ' + l).join('\n');

const endBlock = content.indexOf('<div className="p-6 pt-0">');
let newContent = content.substring(0, endBlock) + '\n    </div>\n  );\n}';

const replacePoint = `              </button>
            </div>
          </div>
        </div>
        {/* Recharts Chart Grid (right 8) */}`;

if (newContent.indexOf(replacePoint) !== -1) {
    const replacement = `              </button>
            </div>
          </div>
${innerConsoleCode}
        </div>
        {/* Recharts Chart Grid (right 8) */}`;
    newContent = newContent.replace(replacePoint, replacement);
    fs.writeFileSync('src/components/TelemetryDashboard.tsx', newContent);
    console.log("Success exact");
} else {
    // Try to just slice it
    const searchStr = '        {/* Recharts Chart Grid (right 8) */}';
    const index = newContent.indexOf(searchStr);
    
    // go back over '</div>'
    const index2 = newContent.lastIndexOf('</div>', index - 1);
    
    let result = newContent.substring(0, index2) + innerConsoleCode + '\n        </div>\n' + newContent.substring(index);
    fs.writeFileSync('src/components/TelemetryDashboard.tsx', result);
    console.log("Success with lastIndexOf");
}
