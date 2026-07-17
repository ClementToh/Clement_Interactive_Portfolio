const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

const oldResetBtn = `              <button
                onClick={() => {
                  setData([]);
                  tickRef.current = 0;
                }}
                className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                title="Reset Buffer"
              >`;

const newResetBtn = `              <button
                onClick={() => {
                  const initialData = [];
                  for (let i = 0; i < 40; i++) {
                    initialData.push(generateTick(i, noiseLevel, filterEnabled, false));
                  }
                  setData(initialData);
                  tickRef.current = 40;
                  setAnomalyActive(false);
                }}
                className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                title="Reset Buffer"
              >`;

content = content.replace(oldResetBtn, newResetBtn);
fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
