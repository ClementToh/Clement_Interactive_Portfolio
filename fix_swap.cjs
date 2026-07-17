const fs = require('fs');
let dataContent = fs.readFileSync('src/data.ts', 'utf8');

const doc1 = `  {
    name: "SAF National Service Certificate of Service",
    category: "Military Certificate",
    path: "assets/Clement_Toh_National Service Certificate of Service.pdf",
    description: ""
  },`;

const doc2 = `  {
    name: "School of MAE Book Prize Certificate",
    category: "Academic Honor",
    path: "assets/Clement_Toh_SP Book Prize.pdf",
    description: ""
  },`;

// Find where they are
dataContent = dataContent.replace(doc1, "___DOC1___");
dataContent = dataContent.replace(doc2, "___DOC2___");

// Now swap
dataContent = dataContent.replace("___DOC1___", doc2);
dataContent = dataContent.replace("___DOC2___", doc1);

fs.writeFileSync('src/data.ts', dataContent);
