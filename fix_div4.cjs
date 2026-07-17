const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

const regex = /\{\s*anomalyActive && \([\s\S]*?\)\s*\}\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div className="p-6 pt-0">/;
if (regex.test(content)) {
    content = content.replace(regex, (match) => {
        // Just remove one of the closing divs.
        return match.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, '</div>\n        </div>\n      </div>');
    });
    fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
    console.log("Replaced");
} else {
    console.log("No match");
}
