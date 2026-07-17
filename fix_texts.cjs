const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

// 1. Text replacement
content = content.replace(
  'Inject active failures to test my telemetry pipelines. Isolate stepper-motor noise spikes, detect mechanical jams, and shut down before mechanical structures warp.',
  'Inject active failures to test my telemetry pipelines. Detect mechanical jams, and shut down before printing structure warp.'
);

// 2. Code snippet replacement
const codeRegex = /const codeSnippet = `\/\/ C\+\+\/Platform\.io Real-time Recoater Anomaly Filter[\s\S]*?\};/;

// wait, the code string continues until line 147 maybe. Let's see how long the codeSnippet is.
