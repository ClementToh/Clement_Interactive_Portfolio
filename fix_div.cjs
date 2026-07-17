const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');
content = content.replace(
  '          </div>\n\n        {/* Recharts Chart Grid (right 8) */}',
  '          </div>\n\n        </div>\n\n        {/* Recharts Chart Grid (right 8) */}'
);
fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
