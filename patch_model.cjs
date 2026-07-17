const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const regex = /function Model\(\{ url \}: \{ url: string \}\) \{\s*const \{ scene \} = useGLTF\(url\);\s*return <primitive object=\{scene\} \/>;\s*\}/;
const replacement = `function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url, "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");
  return <primitive object={scene} />;
}`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/components/CADShowcase.tsx', content);
  console.log("Success");
} else {
  console.log("No match found!");
}
