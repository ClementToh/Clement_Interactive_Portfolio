const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'import { Menu, X, useState } from "react";',
  'import { useState } from "react";'
);

content = content.replace(
  'import { \n  FileText,',
  'import { Menu, X, \n  FileText,'
);

fs.writeFileSync('src/App.tsx', content);
