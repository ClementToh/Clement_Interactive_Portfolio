const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

content = content.replace(
  '            )}\n          </div>\n        </div>\n        </div>\n      </div>\n      \n      <div className="p-6 pt-0">',
  '            )}\n          </div>\n        </div>\n\n      </div>\n      \n      <div className="p-6 pt-0">'
);
fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
