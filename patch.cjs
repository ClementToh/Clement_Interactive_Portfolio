const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

content = content.replace(
  /const \[anomalyActive, setAnomalyActive\] = useState\(false\);/,
  `const [anomalyActive, setAnomalyActive] = useState(false);\n  const [anomalyDurationMs, setAnomalyDurationMs] = useState(0);`
);

content = content.replace(
  /  const triggerAnomaly = \(\) => \{\n    setAnomalyActive\(true\);/,
  `  const triggerAnomaly = () => {\n    setAnomalyActive(true);\n    setAnomalyDurationMs(0);`
);

content = content.replace(
  /  \/\/ Source code templates displayed dynamically based on injected failure modes/,
  `  useEffect(() => {
    if (!anomalyActive) return;
    const start = Date.now();
    const interval = setInterval(() => {
      setAnomalyDurationMs(Date.now() - start);
    }, 50);
    return () => clearInterval(interval);
  }, [anomalyActive]);

  // Source code templates displayed dynamically based on injected failure modes`
);

content = content.replace(
  /          \{\/\* Controls overlaid at bottom right \*\/\}/,
  `          {anomalyActive && (
            <div className="absolute top-5 right-5 bg-red-950/90 border border-red-500/50 text-red-400 font-mono text-xs px-3 py-2 rounded-lg z-20 flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>ANOMALY DETECTED: {(anomalyDurationMs / 1000).toFixed(2)}s</span>
            </div>
          )}
          {/* Controls overlaid at bottom right */}`
);

fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
