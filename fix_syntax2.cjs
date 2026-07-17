const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

content = content.replace(
  '              </button>\n                {anomalyActive && (',
  '              </button>\n            </div>\n\n            {anomalyActive && ('
);

fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
