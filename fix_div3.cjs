const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

const targetStr = `            )}
          </div>
        </div>
        </div>
      </div>
      
      <div className="p-6 pt-0">`;

const replaceStr = `            )}
          </div>
        </div>

      </div>
      
      <div className="p-6 pt-0">`;

content = content.replace(targetStr, replaceStr);
fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
