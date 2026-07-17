const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const regex = /<ErrorBoundary fallback=\{<div className="w-full h-full bg-red-500 text-white flex items-center justify-center">ERROR LOADING GLB<\/div>\}>/;

const replacement = `<ErrorBoundary fallback={
                      <div className="flex flex-col items-center justify-center text-neutral-400 font-mono text-xs gap-3 p-6 text-center w-full h-full min-h-[350px]">
                        <div className="w-12 h-12 mb-2 opacity-50 flex items-center justify-center border border-neutral-700 rounded-md">
                          <Layers className="w-6 h-6" />
                        </div>
                        <p className="text-white font-bold text-sm">3D Model Failed to Load</p>
                        <p className="text-[10px] text-neutral-500 max-w-[250px]">
                          The provided .glb file uses an unsupported compression format (Draco) or was corrupted during upload. 
                        </p>
                        <button onClick={() => window.location.reload()} className="mt-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded text-neutral-300 transition-colors">
                          Retry Loading
                        </button>
                      </div>
                    }>`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/components/CADShowcase.tsx', content);
  console.log("Success");
} else {
  console.log("No match");
}
