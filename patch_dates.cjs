const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// For JD Union
content = content.replace(
  /year: "Jun 2026 – Aug 2026",/g,
  'year: "Jun 2026",'
);
content = content.replace(
  /period: "Jun 2026 – Aug 2026",/g,
  'period: "Jun 2026",'
);

// For A*STAR ARTC End-to-End
// It currently has year: "Sep 2022 – Apr 2023" under astar-iiot
content = content.replace(
  /year: "Sep 2022 – Apr 2023",/g,
  'year: "Sep 2023",'
);
content = content.replace(
  /period: "Sep 2022 – Apr 2023",/g,
  'period: "Sep 2023",'
);

// Personal & Passion Project is already March 2024, but let's make sure.
content = content.replace(
  /year: "March 2024",/g,
  'year: "March 2024",'
);

fs.writeFileSync('src/data.ts', content);
