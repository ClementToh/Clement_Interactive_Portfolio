const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');

const regex1 = /class ErrorBoundary extends React\.Component<\{ fallback: ReactNode; children: ReactNode \}, \{ hasError: boolean \}>/;
const replacement1 = 'class ErrorBoundary extends React.Component<{ fallback: any; children: ReactNode }, { hasError: boolean, error: any }>';
content = content.replace(regex1, replacement1);

const regex2 = /if \(this\.state\.hasError\) return \{typeof this\.props\.fallback === "function" \? this\.props\.fallback\(this\.state\.error\) : this\.props\.fallback\};/;
const replacement2 = 'if (this.state.hasError) return typeof this.props.fallback === "function" ? this.props.fallback(this.state.error) : this.props.fallback;';
content = content.replace(regex2, replacement2);

fs.writeFileSync('src/components/CADShowcase.tsx', content);
