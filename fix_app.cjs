const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// I accidentally replaced a </button></div> somewhere earlier. 
// Oh wait, my patch earlier replaced the very first `</button></div>` which was at line 153.
// Let's just fix line 151-153.
