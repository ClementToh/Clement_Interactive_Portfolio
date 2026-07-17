import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TelemetryDashboard from "./components/TelemetryDashboard";
import CADShowcase from "./components/CADShowcase";
import { 
  PROJECTS, 
  EDUCATION_DOSSIER, 
  EXPERIENCE_DOSSIER, 
  RECOMMENDATION_DOSSIER, 
  LEADERSHIP_DOSSIER, 
  DOCUMENT_REGISTRY 
} from "./data";
import { Menu, X, 
  Briefcase, 
  Linkedin, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText, 
  Cpu, 
  CheckCircle, 
  Download, 
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Award,
  Users,
  ShieldCheck,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  Terminal,
  Layers,
  FileCheck2
} from "lucide-react";

const getDocStyles = (name: string) => {
  if (name.includes("Resume")) {
    return {
      card: "bg-blue-50/50 border-blue-100 hover:bg-blue-50",
      badge: "bg-blue-100/50 text-blue-500 border-blue-100"
    };
  } else if (name.includes("A*STAR")) {
    return {
      card: "bg-yellow-50/50 border-yellow-100 hover:bg-yellow-50",
      badge: "bg-yellow-100/50 text-yellow-600 border-yellow-100"
    };
  } else if (name.includes("Singapore Polytechnic") || name.includes("Book Prize")) {
    return {
      card: "bg-fuchsia-50/50 border-fuchsia-100 hover:bg-fuchsia-50",
      badge: "bg-fuchsia-100/50 text-fuchsia-500 border-fuchsia-100"
    };
  } else if (name.includes("SAF ")) {
    return {
      card: "bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50",
      badge: "bg-emerald-100/50 text-emerald-500 border-emerald-100"
    };
  } else {
    return {
      card: "bg-purple-50/50 border-purple-100 hover:bg-purple-50",
      badge: "bg-purple-100/50 text-purple-500 border-purple-100"
    };
  }
};
const getProjectStyles = (company: string, isSelected: boolean) => {
  if (company.includes("JD Union")) {
    return isSelected
      ? "bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-300"
      : "bg-blue-50/30 hover:bg-blue-50 border-blue-100 hover:shadow-sm";
  } else if (company.includes("A*STAR")) {
    return isSelected
      ? "bg-yellow-50 border-yellow-300 shadow-md ring-1 ring-yellow-300"
      : "bg-yellow-50/30 hover:bg-yellow-50 border-yellow-100 hover:shadow-sm";
  } else if (company.includes("Personal")) {
    return isSelected
      ? "bg-emerald-50 border-emerald-300 shadow-md ring-1 ring-emerald-300"
      : "bg-emerald-50/30 hover:bg-emerald-50 border-emerald-100 hover:shadow-sm";
  }
  return isSelected
    ? "bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900"
    : "bg-neutral-50 hover:bg-white border-neutral-200 hover:shadow-sm";
};

const getProjectContainerStyle = (company: string) => {
  if (company.includes("JD Union")) return "bg-blue-50/50 border-blue-100";
  if (company.includes("A*STAR")) return "bg-yellow-50/50 border-yellow-100";
  if (company.includes("Personal")) return "bg-emerald-50/50 border-emerald-100";
  return "bg-white border-neutral-200";
};

export default function App() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"telemetry" | "cad">("telemetry");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("jd-union");
  const [dossierTab, setDossierTab] = useState<"education" | "experience" | "recommendations" | "leadership">("experience");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("clement.toh2604@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div id="root-container" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white pb-16">
      
      {/* Navigation Rail */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a 
              href="#root-container" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-mono font-bold text-base md:text-lg tracking-tight text-neutral-900 shrink-0 cursor-pointer"
            >
              Clement Toh <span className="text-neutral-400 font-normal">| Mechatronics Systems</span>
            </a>
            <span className="hidden lg:inline-flex px-2 py-0.5 bg-neutral-100 border border-neutral-200 font-mono text-[9px] text-neutral-500 rounded uppercase">
              US Co-Op 2027
            </span>
          </div>
          
                    {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5 text-xs font-mono font-medium text-neutral-500">
            <a href="#co-op-logistics" className="hover:text-neutral-900 transition-colors">US Dossier</a>
            <a href="#lab-workspace" className="hover:text-neutral-900 transition-colors">Interactive</a>
            <a href="#projects-catalog" className="hover:text-neutral-900 transition-colors">Projects</a>
            <a href="#professional-background" className="hover:text-neutral-900 transition-colors">Experience</a>
            
            <button onClick={handleCopyEmail} className="hover:text-neutral-900 transition-colors cursor-pointer">Resume</button>
          </div>
          
          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2 text-neutral-500 hover:text-neutral-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 flex flex-col gap-4 text-xs font-mono font-medium text-neutral-500 shadow-lg absolute w-full">
            <a href="#co-op-logistics" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">US Dossier</a>
            <a href="#lab-workspace" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">Interactive</a>
            <a href="#projects-catalog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">Projects</a>
            <a href="#professional-background" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neutral-900 transition-colors">Experience</a>
            
            <button onClick={() => { handleCopyEmail(); setIsMobileMenuOpen(false); }} className="hover:text-neutral-900 transition-colors text-left">Resume</button>
          </div>
        )}
      </nav>

      {/* Hero Header */}
      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 text-center space-y-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 text-white rounded-full text-xs font-mono">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Seeking US Hardware Validation / Systems Integration Roles (Jan-July 2027)
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-neutral-900 max-w-4xl mx-auto">
          Bridging Complex Physical Assemblies with <span className="text-neutral-500">Digital Validation Telemetry</span>
        </h1>

        <p className="text-neutral-500 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          National University of Singapore (NUS) Mechanical Engineering Honours undergraduate specializing in high-precision mechatronic instrumentation, sensor integration, and real-time data pipelines.
        </p>

        {/* Quick Contacts Bar */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-2">
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 text-xs font-mono rounded-lg transition-all shadow-sm cursor-pointer"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Mail className="w-3.5 h-3.5 text-neutral-400" />}
            {copiedEmail ? "Email Copied!" : "clement.toh2604@gmail.com"}
          </button>

          <a
            href="assets/Clement_Toh_US_Hardware_Engineering_2027.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-mono rounded-lg transition-all shadow-md"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-400" />
            View Resume PDF
          </a>
          <a
            href="https://www.linkedin.com/in/clement26"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 text-xs font-mono rounded-lg transition-all shadow-sm"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-500" />
            Linkedin
          </a>
        </div>
      </header>

      {/* J-1 Visa & Logistics Strategic Advantage Card */}
      <section id="co-op-logistics" className="max-w-6xl mx-auto px-6 pt-16">
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-lg max-w-4xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-100 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://flagcdn.com/us.svg" 
                alt="US Flag" 
                className="w-7 h-auto shrink-0 shadow-sm border border-neutral-200/50 rounded"
              />
              <div>
                <h2 className="text-neutral-900 font-extrabold text-lg md:text-xl">
                  United States Co-Op / Internship Candidate
                </h2>
              </div>
            </div>

            <div className="font-mono text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full shrink-0 uppercase">
              7-Month Runway
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            
            {/* Timeline */}
            <div className="space-y-2 border-r border-neutral-100 pr-4 last:border-0">
              <div className="flex items-center gap-2 text-neutral-900 font-bold font-mono text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-neutral-400" />
                Target Placement Window
              </div>
              <p className="text-blue-600 font-semibold font-sans">
                January 4th, 2027 – July 30th, 2027
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Full-time continuous 7-month block. Officially approved, credit-bearing Co-Op sanctioned by NUS.
              </p>
            </div>

            {/* Visa Burdens */}
            <div className="space-y-2 border-r border-neutral-100 pr-4 last:border-0">
              <div className="flex items-center gap-2 text-neutral-900 font-bold font-mono text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-neutral-400" />
                J-1 Visa Sponsorship
              </div>
              <p className="text-neutral-750 font-semibold font-sans text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Zero Corporate Fee Pathway
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Pre-vetted sponsored J-1 Intern Visa administered via Cultural Vistas. No attorney requirements, zero legal liability or visa lottery petitions for the host company.
              </p>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-neutral-400 font-mono text-center sm:text-left">
              * Relocation Readiness: Zero corporate stipend or relocation advances required upfront.
            </div>
            
            <a 
              href="https://culturalvistas.org/our-programs/j1services/j1-visa-sponsorship-intern-trainee" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-mono font-bold hover:text-blue-800 transition-colors"
            >
              Verify J-1 Admin Details
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* THE LIVE LAB WORKSPACE (Primary Interactive Experience) */}
      <section id="lab-workspace" className="max-w-6xl mx-auto px-6 pt-20">
        <div className="space-y-8">
          
          <div className="text-center space-y-6 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-mono font-bold tracking-tight text-blue-700 bg-blue-50 border border-blue-200 px-6 py-2.5 rounded-full inline-flex justify-center shadow-sm">
              Interactive Project Validation
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Toggle between actual engineering projects below to interact with real-time telemetry simulators, inject failures, and explore mechanical CAD alignments.
            </p>
          </div>

          {/* Core Lab Switchers */}
          <div className="flex justify-center border-b border-neutral-200">
            <div className="flex gap-4 font-mono text-xs md:text-sm">
              <button
                onClick={() => setActiveWorkspaceTab("telemetry")}
                className={`px-3 md:px-5 py-3 border-b-2 font-bold transition-all flex items-center gap-1.5 md:gap-2 cursor-pointer ${
                  activeWorkspaceTab === "telemetry"
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }`}
              >
                <Cpu className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Live EOS M 290</span> Telemetry Panel
              </button>
              
              <button
                onClick={() => setActiveWorkspaceTab("cad")}
                className={`px-3 md:px-5 py-3 border-b-2 font-bold transition-all flex items-center gap-1.5 md:gap-2 cursor-pointer ${
                  activeWorkspaceTab === "cad"
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                Mechanical CAD & DFM
              </button>


            </div>
          </div>

          {/* Active Work Panel viewport */}
          <div className="transition-all duration-300">
            {activeWorkspaceTab === "telemetry" && <TelemetryDashboard />}
            {activeWorkspaceTab === "cad" && <CADShowcase />}
          </div>

        </div>
      </section>

      {/* TECHNICAL PROJECTS CATALOG */}
      <section id="projects-catalog" className="max-w-6xl mx-auto px-6 pt-24">
        <div className="space-y-8">
          
          <div className="text-center space-y-6 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-mono font-bold tracking-tight text-emerald-700 bg-emerald-50 border border-emerald-200 px-6 py-2.5 rounded-full inline-flex justify-center shadow-sm">
              Engineering Projects & Technical Depth
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Examine the detailed mechanical schematics, thermal calculations, and real-time database query logic engineered across multiple research and industrial facilities.
            </p>
          </div>

          {/* Catalog Inner Selector Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Project List Column (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1 px-1">SELECT AN ENGINEERING PROJECT:</span>
              {PROJECTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer block ${getProjectStyles(p.company, selectedProjectId === p.id)}`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                      {p.company}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-neutral-100 text-neutral-500 rounded">
                      {p.year.split(" ").pop()}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-neutral-900 leading-tight">
                    {p.title}
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-1 mt-1 font-sans">
                    {p.subtitle}
                  </p>
                </button>
              ))}
            </div>

            {/* Selected Project Full Detailed Container (8 cols) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProjectId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className={`${getProjectContainerStyle(activeProject.company)} border rounded-2xl p-6 md:p-8 shadow-md h-full flex flex-col justify-between space-y-6`}
                >
                  <div className="space-y-4">
                    {/* Metatags bar */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 border-b border-neutral-100 pb-4">
                      <div>
                        <span className="font-mono text-[10px] text-neutral-400 uppercase block">Facility/Owner</span>
                        <span className="font-semibold text-xs text-neutral-800">{activeProject.company}</span>
                      </div>
                      <div className="h-6 w-px bg-neutral-200 hidden sm:block"></div>
                      <div>
                        <span className="font-mono text-[10px] text-neutral-400 uppercase block">Project Window</span>
                        <span className="font-semibold text-xs text-neutral-800">{activeProject.year}</span>
                      </div>
                      <div className="h-6 w-px bg-neutral-200 hidden sm:block"></div>
                      <div>
                        <span className="font-mono text-[10px] text-neutral-400 uppercase block">Core Role</span>
                        <span className="font-semibold text-xs text-neutral-800">Mechatronics Engineer</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-neutral-900 leading-snug">
                        {activeProject.title}
                      </h3>
                      <p className="text-xs font-mono text-blue-600 font-semibold tracking-wider">
                        // {activeProject.subtitle.toUpperCase()}
                      </p>
                    </div>

                    {/* Detailed Prose Narrative */}
                    <div className="text-sm text-neutral-600 leading-relaxed font-sans space-y-3">
                      <p>{activeProject.fullNarrative}</p>
                    </div>

                    {/* Key Metrics / Achievements */}
                    <div className="space-y-2.5 pt-2">
                      <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Verified Technical Contributions:</span>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeProject.keyMetrics.map((m, idx) => (
                          <li key={idx} className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200/50">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-xs text-neutral-700 font-medium leading-relaxed">{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Tag Cloud */}
                    <div className="space-y-1.5 pt-2">
                      <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Tech Stack & Lab Equipment:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.technologies.map((t, idx) => (
                          <span key={idx} className="px-2 py-1 bg-neutral-100 text-neutral-600 font-mono text-[10px] rounded border border-neutral-200/50 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project specific resource links */}
                  <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide">
                      * All technical drawings, reports, and code blocks verified in-lab.
                    </span>

                    <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                      {activeProject.id === "astar-iiot" && (
                        <>
                          <a
                            href="https://drive.google.com/file/d/1W9TOhxwTP4rxf40mj0UgdFuoLkpxVE1q/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto text-center px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Project Report
                          </a>
                          <a
                            href="https://drive.google.com/file/d/1bqPkzb7tGjqC66I2I_as3Gb2MobRNwhw/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto text-center px-4 py-2 bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Research Poster
                          </a>
                        </>
                      )}
                      {activeProject.id === "spectrometer-sync" && (
                        <>
                          <a
                            href="https://drive.google.com/file/d/1W9TOhxwTP4rxf40mj0UgdFuoLkpxVE1q/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto text-center px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Optical Setup Report
                          </a>
                        </>
                      )}
                      {activeProject.id === "jd-union" && (
                        <button
                          onClick={() => setActiveWorkspaceTab("cad")}
                          className="w-full sm:w-auto text-center px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          Inspect Workstation CAD
                        </button>
                      )}
                      {activeProject.id === "printer-thermal" && (
                        <a
                          href="assets/Clement_Toh_US_Hardware_Engineering_2027.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto text-center px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Thermal Resume Spec
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* PROFESSIONAL BACKGROUND & CREDIT DOSSIER */}
      <section id="professional-background" className="max-w-6xl mx-auto px-6 pt-24">
        <div className="space-y-8">
          
          <div className="text-center space-y-6 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-mono font-bold tracking-tight text-blue-700 bg-blue-50 border border-blue-200 px-6 py-2.5 rounded-full inline-flex justify-center shadow-sm">
              Professional Background
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Clement Toh is an honors student at NUS with proven mechatronics internship experience, highly endorsed by senior academic and research advisors.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto">
            
            {/* Dossier Navigation Tabs */}
            <div className="flex flex-wrap border-b border-neutral-100 pb-4 mb-6 gap-2 text-xs font-mono">
              <button
                onClick={() => setDossierTab("experience")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  dossierTab === "experience"
                    ? "bg-neutral-900 text-white font-bold"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                Industry Experience
              </button>
              
              <button
                onClick={() => setDossierTab("education")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  dossierTab === "education"
                    ? "bg-neutral-900 text-white font-bold"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                Education
              </button>

              <button
                onClick={() => setDossierTab("recommendations")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  dossierTab === "recommendations"
                    ? "bg-neutral-900 text-white font-bold"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
                Testimonials
              </button>

              <button
                onClick={() => setDossierTab("leadership")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  dossierTab === "leadership"
                    ? "bg-neutral-900 text-white font-bold"
                    : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <Users className="w-3.5 h-3.5 shrink-0" />
                Leadership & Engagement
              </button>
            </div>

            {/* Dossier Content viewport */}
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={dossierTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* EDUCATION TAB */}
                  {dossierTab === "education" && (
                    <div className="space-y-8">
                      {EDUCATION_DOSSIER.map((edu, idx) => (
                        <div key={idx} className="border-b border-neutral-100 pb-6 last:border-0 last:pb-0 space-y-3">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                            <div>
                              <h4 className="text-base font-extrabold text-neutral-900 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-neutral-400 shrink-0" />
                                {edu.school}
                              </h4>
                              <p className="text-sm text-neutral-600 font-medium">{edu.degree}</p>
                            </div>
                            <div className="text-right">
                              <span className="font-mono text-xs text-neutral-400 block">{edu.period}</span>
                              <span className="inline-block mt-1 font-mono text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full">
                                GPA: {edu.gpa}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                              <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Specialized Coursework:</span>
                              <div className="flex flex-wrap gap-1">
                                {edu.coursework.map((course, cIdx) => (
                                  <span key={cIdx} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded border border-neutral-200/50">
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {edu.awards && edu.awards.length > 0 && (
                              <div className="space-y-1">
                                <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Awards & Honors:</span>
                                <ul className="space-y-1">
                                  {edu.awards.map((award, aIdx) => (
                                    <li key={aIdx} className="flex items-start gap-1 text-neutral-700 font-medium">
                                      <Award className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                                      <span>{award}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {edu.certificates && edu.certificates.length > 0 && (
                            <div className="pt-2 flex flex-wrap gap-2">
                              {edu.certificates.map((cert, certIdx) => (
                                <a
                                  key={certIdx}
                                  href={cert.path}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-neutral-900 rounded text-xs font-mono font-medium transition-colors"
                                >
                                  <ArrowUpRight className="w-3 h-3 shrink-0" />
                                  {cert.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* EXPERIENCE TAB */}
                  {dossierTab === "experience" && (
                    <div className="space-y-8">
                      {EXPERIENCE_DOSSIER.map((exp, idx) => (
                        <div key={idx} className="border-b border-neutral-100 pb-6 last:border-0 last:pb-0 space-y-3">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                            <div>
                              <h4 className="text-base font-extrabold text-neutral-900">
                                {exp.role}
                              </h4>
                              <p className="text-sm text-neutral-600 font-semibold">{exp.company}</p>
                            </div>
                            <span className="font-mono text-xs text-neutral-400 shrink-0">{exp.period}</span>
                          </div>

                          <ul className="space-y-2 text-xs text-neutral-600 list-disc pl-4 leading-relaxed font-sans">
                            {exp.description.map((bullet, bIdx) => (
                              <li key={bIdx} className="pl-0.5">
                                {bullet}
                              </li>
                            ))}
                          </ul>

                          {exp.links && exp.links.length > 0 && (
                            <div className="pt-2 flex flex-wrap gap-2">
                              {exp.links.map((link, lIdx) => (
                                <a
                                  key={lIdx}
                                  href={link.path}
                                  target={link.path.startsWith("http") || link.path.endsWith(".pdf") ? "_blank" : undefined}
                                  rel={link.path.startsWith("http") || link.path.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-neutral-900 rounded text-xs font-mono font-medium transition-colors"
                                >
                                  <ExternalLink className="w-3 h-3 shrink-0" />
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TESTIMONIALS TAB */}
                  {dossierTab === "recommendations" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {RECOMMENDATION_DOSSIER.map((rec, idx) => (
                        <div key={idx} className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 flex flex-col justify-between space-y-6">
                          <p className="text-xs text-neutral-600 leading-relaxed italic">
                            "{rec.quote}"
                          </p>
                          <div className="flex flex-col gap-3">
                            <div>
                              <h4 className="text-xs font-extrabold text-neutral-900">{rec.author}</h4>
                              <p className="text-[10px] text-neutral-500 leading-tight mt-0.5">{rec.title}</p>
                            </div>
                            <a
                              href={rec.pdfPath}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex justify-center items-center gap-1.5 px-3 py-1.5 bg-[#222222] hover:bg-black text-white text-xs font-mono font-bold rounded-lg transition-colors w-fit shadow-sm"
                            >
                              <Download className="w-3 h-3 shrink-0" />
                              View Full Letter
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* LEADERSHIP TAB */}
                  {dossierTab === "leadership" && (
                    <div className="space-y-6">
                      {LEADERSHIP_DOSSIER.map((lead, idx) => (
                        <div key={idx} className="border-b border-neutral-100 pb-5 last:border-0 last:pb-0 space-y-2">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1">
                            <div>
                              <h4 className="text-sm font-extrabold text-neutral-900 flex items-center gap-1.5">
                                <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                                {lead.title}
                              </h4>
                              <p className="text-xs text-neutral-500 font-semibold">{lead.organization}</p>
                            </div>
                            <span className="font-mono text-xs text-neutral-400 shrink-0">{lead.period}</span>
                          </div>
                          
                          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                            {lead.description}
                          </p>

                          <a
                            href={lead.pdfPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-neutral-900 rounded text-[10px] font-mono font-semibold transition-colors mt-1"
                          >
                            <Download className="w-3 h-3 shrink-0" />
                            Certificate of Verification
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* VERIFIED DOCUMENT REGISTRY & DOWNLOAD CENTER */}
      <section id="document-registry" className="max-w-6xl mx-auto px-6 pt-24">
        <div className="space-y-8">
          
          <div className="text-center space-y-6 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-mono font-bold tracking-tight text-violet-700 bg-violet-50 border border-violet-200 px-6 py-2.5 rounded-full inline-flex justify-center shadow-sm">
              Resources
            </h2>
          </div>

          {/* Registry Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCUMENT_REGISTRY.map((doc, idx) => (
              <a
                key={idx}
                href={doc.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group cursor-pointer ${getDocStyles(doc.name).card}`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`font-mono text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getDocStyles(doc.name).badge}`}>
                      {doc.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-neutral-300 group-hover:text-violet-600 transition-colors shrink-0" />
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                  </div>
                  <h4 className="text-sm font-extrabold text-neutral-900 group-hover:text-violet-700 transition-colors tracking-tight leading-tight">
                    {doc.name}
                  </h4>
                  {doc.description && (
                  <p className="text-xs text-neutral-500 leading-normal font-sans">
                    {doc.description}
                  </p>
                  )}
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL ENGAGEMENT BOARD */}
      <section className="max-w-4xl mx-auto px-6 pt-24">
        <div className="bg-white border-2 border-neutral-950 rounded-3xl p-8 md:p-12 text-center shadow-lg space-y-6">
          <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Interested in Clement's Engineering Approach?
          </h3>
          <p className="text-neutral-500 max-w-lg mx-auto text-sm leading-relaxed">
            I am currently seeking a 7-month US Hardware Validation / Systems Integration Co-Op beginning January 2027. If your team needs someone who bridges raw physical mechatronics with real-time digital telemetry, let's talk!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3 bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold rounded-xl transition-all shadow-md cursor-pointer"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400 animate-pulse" /> : <Mail className="w-4 h-4 text-neutral-400" />}
              {copiedEmail ? "Email Copied!" : "clement.toh2604@gmail.com"}
            </button>
            
            <a
              href="assets/Clement_Toh_US_Hardware_Engineering_2027.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3 bg-white text-neutral-900 border border-neutral-200 text-xs font-mono font-bold rounded-xl hover:bg-neutral-50 transition-all shadow-sm"
            >
              <ArrowUpRight className="w-4 h-4 text-neutral-400 shrink-0" />
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-neutral-200 mt-24 bg-white shrink-0">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 font-mono">
          <p>© Clement Toh - Mechatronics Systems & Validation</p>
          <div className="flex flex-wrap justify-center items-center gap-5 font-medium">
            <a href="#co-op-logistics" className="hover:text-neutral-900 transition-colors">US Dossier</a>
            <a href="#lab-workspace" className="hover:text-neutral-900 transition-colors">Interactive</a>
            <a href="#projects-catalog" className="hover:text-neutral-900 transition-colors">Projects</a>
            <a href="#professional-background" className="hover:text-neutral-900 transition-colors">Experience</a>
            <button onClick={handleCopyEmail} className="hover:text-neutral-900 transition-colors cursor-pointer">Resume</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
