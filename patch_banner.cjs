const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

// 1. Add states and refs
const stateRegex = /const \[anomalyActive, setAnomalyActive\] = useState\(false\);\n[ \t]*const \[anomalyDurationMs, setAnomalyDurationMs\] = useState\(0\);/;
if (!stateRegex.test(content)) {
    console.error("Could not find states");
    process.exit(1);
}
content = content.replace(stateRegex, 
`const [anomalyActive, setAnomalyActive] = useState(false);
  const [anomalyDurationMs, setAnomalyDurationMs] = useState(0);
  const [showAnomalyBanner, setShowAnomalyBanner] = useState(false);
  
  const anomalyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (anomalyTimeoutRef.current) clearTimeout(anomalyTimeoutRef.current);
      if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
    };
  }, []);`
);

// 2. Change triggerAnomaly
const triggerRegex = /const triggerAnomaly = \(\) => \{\n[ \t]*setAnomalyActive\(true\);\n[ \t]*setAnomalyDurationMs\(0\);\n[ \t]*\n[ \t]*\/\/ Automatically reset anomaly after 5 seconds\n[ \t]*setTimeout\(\(\) => \{\n[ \t]*setAnomalyActive\(false\);\n[ \t]*\}, 4500\);\n[ \t]*\};/;

if (!triggerRegex.test(content)) {
    console.error("Could not find triggerAnomaly");
    process.exit(1);
}

content = content.replace(triggerRegex,
`const triggerAnomaly = () => {
    if (anomalyTimeoutRef.current) clearTimeout(anomalyTimeoutRef.current);
    if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);

    setAnomalyActive(true);
    setShowAnomalyBanner(true);
    setAnomalyDurationMs(0);
    
    anomalyTimeoutRef.current = setTimeout(() => {
      setAnomalyActive(false);
      bannerTimeoutRef.current = setTimeout(() => {
        setShowAnomalyBanner(false);
      }, 7000);
    }, 4500);
  };`
);

// 3. Change banner UI
const bannerRegex = /\{anomalyActive && \(\n[ \t]*<div className="absolute top-5 right-5 bg-red-950\/90 border border-red-500\/50 text-red-400 font-mono text-xs px-3 py-2 rounded-lg z-20 flex items-center gap-2 shadow-\[0_0_15px_rgba\(220,38,38,0\.3\)\]">/;

if (!bannerRegex.test(content)) {
    console.error("Could not find banner UI");
    process.exit(1);
}

content = content.replace(bannerRegex,
`{showAnomalyBanner && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-red-950/90 border border-red-500/50 text-red-400 font-mono text-xs px-3 py-2 rounded-lg z-20 flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]">`
);

// 4. Update the reset button to also clear banner
const resetBtnRegex = /setAnomalyActive\(false\);/;
// Let's just find the onClick handler inside reset button
const resetBtnMatch = content.match(/onClick=\{\(\) => \{\n[ \t]*const initialData = \[\];\n[ \t]*for \(let i = 0; i < 40; i\+\+\) \{\n[ \t]*initialData\.push\(generateTick\(i, noiseLevel, filterEnabled, false\)\);\n[ \t]*\}\n[ \t]*setData\(initialData\);\n[ \t]*tickRef\.current = 40;\n[ \t]*setAnomalyActive\(false\);\n[ \t]*\}\}/);

if (resetBtnMatch) {
    const newReset = resetBtnMatch[0].replace(
        `setAnomalyActive(false);`,
        `setAnomalyActive(false);
                setShowAnomalyBanner(false);
                if (anomalyTimeoutRef.current) clearTimeout(anomalyTimeoutRef.current);
                if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);`
    );
    content = content.replace(resetBtnMatch[0], newReset);
}

fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
console.log("Success");
