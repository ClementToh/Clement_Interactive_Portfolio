const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const rightSideReplacement = `            {activePart ? (
              /* Display details of actively clicked component */`;

const rightSideElseReplacement = `            ) : (
              /* Prompt to select a part */
              <div className="flex-1 flex flex-col space-y-3 animate-fade-in">
                <p className="text-neutral-500 text-xs mb-2">Select a component to view technical constraints and integration logic:</p>
                {cadData?.components.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePart(c.name)}
                    className="w-full text-left p-3 rounded-lg border border-neutral-200 bg-white hover:border-blue-400 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs font-bold text-neutral-800 group-hover:text-blue-600 transition-colors">{c.name}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 font-mono">{c.type}</span>
                    </div>
                    <span className="text-[10px] text-neutral-500 block line-clamp-1">{c.spec}</span>
                  </button>
                ))}
              </div>
            )}`;

content = content.replace(/            \) : \([\s\S]*?            \)\}/, rightSideElseReplacement);

fs.writeFileSync('src/components/CADShowcase.tsx', content);
