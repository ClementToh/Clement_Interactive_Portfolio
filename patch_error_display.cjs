const fs = require('fs');
let content = fs.readFileSync('src/components/CADShowcase.tsx', 'utf8');
content = content.replace(/this\.props\.fallback/, '{typeof this.props.fallback === "function" ? this.props.fallback(this.state.error) : this.props.fallback}');
content = content.replace(/hasError: false/, 'hasError: false, error: null');
content = content.replace(/static getDerivedStateFromError\(\) \{ return \{ hasError: true \}; \}/, 'static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }');
fs.writeFileSync('src/components/CADShowcase.tsx', content);
