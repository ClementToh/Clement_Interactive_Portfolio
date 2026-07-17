import { ProjectDetail } from "./types";

export interface DocumentResource {
  name: string;
  category: string;
  path: string;
  description: string;
}

export interface RecommendationQuote {
  quote: string;
  author: string;
  title: string;
  pdfPath: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  links?: { label: string; path: string }[];
}

export interface EducationItem {
  school: string;
  degree: string;
  gpa: string;
  period: string;
  coursework: string[];
  awards?: string[];
  certificates?: { label: string; path: string }[];
}

export const PROJECTS: ProjectDetail[] = [
  {
    id: "jd-union",
    title: "Laser Workstation CAD, DFM & Optomechanics",
    subtitle: "Optomechatronic sub-micron precision laboratory infrastructure",
    company: "JD Union Pte. Ltd.",
    year: "Jun 2026",
    description: "Spearheaded mechanical design of mechatronic testing jigs and heavy-duty movable workstations (>250kg) for Class 4 lasers using SolidWorks, Autodesk Inventor, and strict DFM tolerances.",
    fullNarrative: "In advanced laser processing, motion control software is only as good as the physical hardware it sits on. At JD Union, I bridged the gap between digital control intent and physical fabrication. I designed and detailed a 5-tier Movable Laser Workstation from the ground up using SolidWorks, utilizing 4040 HFS aluminum extrusions (8mm slot width) with strict squareness constraints to isolate floor vibrations. Sized internal shelving for heavy-duty components: an IPG Ytterbium Fibre Laser, a dedicated laser chiller, and a NANIO Air Power Supply, optimizing heat dissipation and cable routing. Handled DFM by generating comprehensive 3rd-angle projection manufacturing drawings (defining hole patterns, 3mm structural fillets, and M6x16 countersunk screw holes) and liaising with regional CNC suppliers. In addition, I set up and tested Class 4 CO2 lasers (LUXINAR E25-9.3 and GLPN-500-12-75M) and conducted optical quality control inspections on delicate Quartz Block Head (QBH) connectors under a monocular microscope.",
    keyMetrics: [
      "Designed rigid 5-tier chassis supporting >250kg dynamic loads",
      "Drafted production-ready 2D DFM drawings complete with strict tolerances",
      "Liaised with overseas suppliers (via Taobao) to coordinate CNC metal milling",
      "Completed micro-contaminant inspection of QBH fiber optic connectors using monocular microscopes"
    ],
    technologies: ["SolidWorks", "Autodesk Inventor", "DFM / 2D Drafting", "Optomechanics", "Class 4 Laser Safety", "Optical QC Inspection"],
    cadInteractiveData: {
      assemblyWeight: "265 kg",
      vibrationSpec: "< 0.5 μm amplitude isolation @ 15-50 Hz",
      components: [
        { name: "LUXINAR CO2 Class 4 Source", type: "Optical Engine", status: "Calibrated", spec: "10.6 μm wavelength, CO2 block" },
        { name: "Constrained 4040 Al Chassis", type: "Structural Frame", status: "Validated", spec: "HFS T-Slot Extrususion, M6 screw patterns" },
        { name: "IPG Ytterbium Fibre laser", type: "Fibre Laser", status: "Active", spec: "High peak power, water-cooled" },
        { name: "Optomechanical XY Stage", type: "Precision Motion", status: "Operational", spec: "Sub-micron repeatability galvanometer" },
        { name: "Dual-Chamber Chiller Routing", type: "Thermal Subsystem", status: "Flow OK", spec: "2.4 kW cooling capacity, 4040 channels" }
      ]
    }
  },
  {
    id: "astar-iiot",
    title: "End-to-End LPBF 3D Printing IIoT System",
    subtitle: "High-fidelity industrial telemetry and edge sensor integration",
    company: "A*STAR ARTC",
    year: "Sep 2023",
    description: "Designed custom mechanical passthroughs and PCB safety systems to integrate strain gauges and acoustic emission sensors on an EOS M 290 3D printer, building real-time telemetry pipelines.",
    fullNarrative: "In industrial Laser Powder Bed Fusion (LPBF), capturing process faults (such as delamination or part warping) is highly challenging. I engineered a non-intrusive sensor instrumentation system on a commercial EOS M 290 3D printer without modifying the machine chassis. Mounted three Rosette strain gauges (part warpage) and a Kistler 8152C Acoustic Emission sensor (100KHz-900kHz, detecting stress waves). Routed 12 signal wires through a custom-machined 13mm hermetic port plate using secure PCB holders modeled in Siemens NX. Engineered an adaptor PCB with a 200mA fast-acting fuse to eliminate spark risks, keeping the chamber oxygen levels safely <0.1%. Connected the system to an M5Stack FIRE edge microcontroller running custom C++ firmware (Platform.io IDE, GitLab managed under branch 'm290phr'). The edge node executed real-time Flux queries to extract signal tower states from InfluxDB, triggering LED arrays (Green for active, Red for errors) and pushing live, multi-parameter dashboards onto Grafana to detect anomalies down to ~50 μm.",
    keyMetrics: [
      "Routed 12-channel sensor lines without losing argon chamber seal (<0.1% O2)",
      "Engineered ESP32/C++ firmware achieving <15ms end-to-end streaming latency",
      "Successfully detected powder bed surface anomalies of just ~50 μm",
      "Visualized 5 critical print parameters live in Grafana dashboards"
    ],
    technologies: ["C++ / Platform.io", "Siemens NX CAD", "NI DAQ (NI-9236)", "InfluxDB (Flux Scripting)", "Grafana Telemetry", "Kistler Acoustic Sensors"],
    cadInteractiveData: {
      assemblyWeight: "1.2 kg (Passthrough Collar)",
      vibrationSpec: "2 kHz continuous DAQ sample rate",
      components: [
        { name: "NI-9236 Strain Gauge Module", type: "Signal Acquisition", status: "Online", spec: "350 Ω full-bridge, 2 kHz sample rate" },
        { name: "M5Stack Core2 Edge Device", type: "Microcontroller", status: "Streaming", spec: "ESP32, custom C++ firmware, LED alerts" },
        { name: "InfluxDB Time-Series Engine", type: "Database Service", status: "Connected", spec: "Continuous Flux query, 7-day retention" },
        { name: "Grafana Web Interface", type: "Data Visualization", status: "Active", spec: "Live dashboards for 5 physical parameters" },
        { name: "Kistler 8152C Acoustic Sensor", type: "Acoustic emission", status: "Active", spec: "High-frequency stress wave listener (100-900kHz)" }
      ]
    }
  },
  {
    id: "spectrometer-sync",
    title: "In-Situ Spectrometer Kinematic Synchronization",
    subtitle: "Reverse-engineering Industrial PC packet streams via Python data pipelines",
    company: "A*STAR ARTC",
    year: "Sep 2023",
    description: "Intercepted and parsed Ethernet Powerlink V2 network packets on a proprietary metal 3D printer IPC to synchronize a Firefly4000 optical spectrometer with mechanical recoater kinematics.",
    fullNarrative: "To analyze elemental metal powder composition in-situ, we integrated a Firefly4000 optical spectrometer. The spectrometer needed to trigger *only* when the printer's recoater blade and platform were strictly stationary to prevent motion-blurred optical signatures. Since the EOS M 290 has proprietary 'black-box' controls, we bypassed the software restrictions by hardware tapping the printer's Industrial PC (IPC). We monitored a 30.6-hour live titanium print job, capturing millions of network packets. I built a Python data pipeline to parse the hex strings, downsample the massive dataset to 16,558 rows, and graph electrical signals. By cross-referencing InfluxDB recoater speeds and dispenser coordinates, I proved that 'Node ID 2' correlated perfectly with recoater kinematics. This successfully established the microsecond-synchronized trigger for the spectrometer's digital shutter.",
    keyMetrics: [
      "Deciphered proprietary Ethernet POWERLINK V2 binary protocol on-the-fly",
      "Parsed and downsampled multi-million packet datasets using NumPy/Pandas",
      "Synchronized spectrometer digital shutter trigger with <50μs jitter",
      "Validated node kinematics against physical motor position telemetry"
    ],
    technologies: ["Python (Scapy, Pandas)", "Ethernet POWERLINK V2", "Packet Sniffing / Wireshark", "Compact Spectrometer Firefly4000", "Optomechatronic Alignment"],
    cadInteractiveData: {
      assemblyWeight: "N/A (Software Parser)",
      vibrationSpec: "Packet decoding latency < 12 μs",
      components: [
        { name: "Python EPL Packet Tap", type: "Network Parser", status: "Active", spec: "Scapy-based Ethernet driver, hex converter" },
        { name: "Spectrometer Digital Shutter", type: "Optical Hardware", status: "Triggered", spec: "Opto-isolated TTL 5V, SMA905 fiber line" },
        { name: "Recoater Blade Kinematic Map", type: "Kinematics Parser", status: "Calibrated", spec: "Real-time velocity and offset parser" },
        { name: "Firefly4000 Spectrometer", type: "Spectroscopy sensor", status: "Connected", spec: "Focused collimator and focusing lens" }
      ]
    }
  },
  {
    id: "printer-thermal",
    title: "3D Printer Thermal & Fluid Optimization",
    subtitle: "Re-engineering FDM hardware for structural prototype manufacturing",
    company: "Personal & Passion Project",
    year: "March 2024",
    description: "Redesigned thermal and mechanical sub-assemblies on an Ender 3 V3 SE printer, modeling custom double-duct laminar print shrouds in Fusion 360 to eradicate warping.",
    fullNarrative: "To manufacture robust, load-bearing utility components (such as tolerance-fit power bank holders, custom faucet tap keys, and slot-mechanism enclosures), I required pristine material extrusion. Consumer printers suffer from directional cooling limitations and thermal hot-spots, causing warp in high-temp filaments. I executed a comprehensive mechanical and thermal re-engineering of an Ender 3 V3 SE. Replaced stock cooling with high-performance WINSINN 5015 blowers and 4010 fans. Modeled a custom dual-duct cooling shroud in Fusion 360 to direct uniform laminar airflow over the hotend extrusion tip, optimizing solidifying crystallization. Upgraded the bed to a textured PEI spring steel sheet, installed hardened brass nozzles for abrasive filaments, and implemented anti-vibration rubber damping pads to dampen motor resonance, resulting in flawless first layers and high structural print fidelity.",
    keyMetrics: [
      "Achieved 45% increase in cooling airflow velocity targeting the extrusion point",
      "Eradicated structural warping (90% reduction) in complex high-temp prints",
      "Designed an ultra-lightweight 32g dual shroud using Fusion 360",
      "Successfully printed and tested load-bearing emergency parts (faucet tap key)"
    ],
    technologies: ["Fusion 360 CAD", "Additive Manufacturing (FDM)", "Laminar Fluid Cooling", "Thermal Management", "Precision Prototyping"],
    cadInteractiveData: {
      assemblyWeight: "32 g (Shroud)",
      vibrationSpec: "Vibration isolated via custom damping pads",
      components: [
        { name: "WINSINN 5015 Blower Fans", type: "Fluid Cooling", status: "Active", spec: "24V high-speed, dual intake design" },
        { name: "Custom Shroud (Fusion 360)", type: "Airflow Duct", status: "Printed", spec: "Dual-exit laminar guide, glass-fiber filament" },
        { name: "Textured PEI Spring Sheet", type: "Build Surface", status: "Active", spec: "High adhesive textured spring steel, 220x220mm" },
        { name: "Hardened Brass Nozzles", type: "Thermal Extrusion", status: "Installed", spec: "0.4mm, wear-resistant, high heat conductivity" }
      ]
    }
  }
];

export const EDUCATION_DOSSIER: EducationItem[] = [
  {
    school: "National University of Singapore (NUS)",
    degree: "Bachelor of Engineering (Mechanical Engineering) with Honours",
    gpa: "4.19 / 5.00 (Honours)",
    period: "Aug 2025 – Expected May 2028",
    coursework: ["Industrial Additive Manufacturing", "Structural Statics", "Thermodynamics", "Circuit Analysis", "Mechatronics"]
  },
  {
    school: "Singapore Polytechnic (SP)",
    degree: "Diploma in Mechanical Engineering (with Merit)",
    gpa: "3.86 / 4.00 (Graduated with Merit)",
    period: "Apr 2020 – Apr 2023",
    coursework: ["Mechatronics & Control Systems", "Fluid Mechanics", "CAD Design (SolidWorks / NX)", "Engineering Materials"],
    awards: [
      "School of Mechanical & Aeronautical Engineering Book Prize (Top in Cohort for Communicating for Personal & Team Effectiveness)",
      "Certificate of Recognition: MAE Buddy Programme (Peer Mentor)"
    ],
    certificates: [
      { label: "SP Diploma Testimonial", path: "assets/Clement_Toh_SP Testimonial.pdf" },
      { label: "SP Book Prize Certificate", path: "assets/Clement_Toh_SP Book Prize.pdf" },
      { label: "SP MAE Buddy Programme Certificate", path: "assets/Clement_Toh_SP MAE Buddy Programme.pdf" },
      { label: "Build Your Own Internet of Things Certification", path: "assets/Clement_Toh_Build Your Own Internet of Things Certification.pdf" }
    ]
  }
];

export const EXPERIENCE_DOSSIER: ExperienceItem[] = [
  {
    role: "Mechatronics Systems Intern",
    company: "JD Union Pte. Ltd.",
    period: "Jun 2026",
    description: [
      "Spearheaded mechatronics workspace structural assemblies and modeled heavy-duty Movable Laser Workstations (>250kg) using SolidWorks and DFM principles.",
      "Dimensioned structural t-slot frames and cable routing to isolate delicate IPG Ytterbium fiber lasers, chillers, and power units from vibration and debris.",
      "Tested Class 4 industrial CO2 lasers (LUXINAR CO2 block) under laboratory safety guidelines and performed microscope quality control on delicate optical fiber heads."
    ],
    links: [
      { label: "Verify JD Union Workstation", path: "#lab-workspace" }
    ]
  },
  {
    role: "Systems Integration / Engineering Intern",
    company: "A*STAR ARTC",
    period: "Sep 2023",
    description: [
      "Designed and fabricated custom 13mm hermetically sealed sensor passthrough systems for commercial EOS M 290 3D printers, safely routing 12-channel DAQ lines.",
      "Integrated strain gauges and acoustic sensors to isolate weld anomalies down to ~50μm while maintaining argon chamber vacuum levels.",
      "Intercepted and parsed binary Ethernet Powerlink V2 network communication to synchronize Firefly4000 spectrometer sensors with moving recoater blade kinematics.",
      "Constructed custom C++ firmware on M5Stack/ESP32 hardware, connected InfluxDB databases, and streamed metrics live to Grafana dashboards with Flux triggers."
    ],
    links: [
      { label: "Project Report", path: "https://drive.google.com/file/d/1W9TOhxwTP4rxf40mj0UgdFuoLkpxVE1q/view?usp=sharing" },
      { label: "Project Poster", path: "https://drive.google.com/file/d/1bqPkzb7tGjqC66I2I_as3Gb2MobRNwhw/view?usp=sharing" },
      { label: "Recommendation Letter", path: "assets/Clement_Toh_ARTC Testimonial.pdf" }
    ]
  },
  {
    role: "Systems Operator (Armour Simulation Wing)",
    company: "Singapore Armed Forces (National Service)",
    period: "May 2023 – May 2025",
    description: [
      "Operated, configured, and maintained advanced military hardware simulation cabins, troubleshooting electro-mechanical controls.",
      "Collaborated with engineers from Rheinmetall (Germany) and ST Engineering (Singapore) to debug network stability, sensor calibrations, and system hardware-software linkages.",
      "Achieved maximum system uptime, ensuring zero simulation interruptions during military combat training blocks."
    ],
    links: [
      { label: "Certificate of Service", path: "assets/Clement_Toh_National Service Certificate of Service.pdf" },
      { label: "Commander's Testimonial", path: "assets/Clement_Toh_National Service Testimonial.pdf" }
    ]
  }
];

export const RECOMMENDATION_DOSSIER: RecommendationQuote[] = [
  {
    quote: "The perseverance with which he tackles problems is commendable... Clement had no issues picking up new topics with IoT, industrial hardware, or C++/Python programming when tasked to do so... I am certain that Clement will be a great addition in any forward-looking team to contribute his problem solving skills.",
    author: "Dr. Zheng Jie TAN",
    title: "Senior Scientist II, ARTC (A*STAR)",
    pdfPath: "assets/Clement_Toh_ARTC Testimonial.pdf"
  },
  {
    quote: "Clement was a competent student who demonstrated a positive attitude... Overall, Toh En Rui Clement was a student who has showed interest in improving himself and exercised self-discipline. He set his personal and academic goals, and put in time and effort to achieve them. He faced setbacks with firm resolve. Through it all, he exercised integrity in his speech and actions.",
    author: "Dr. CHONG Chee Wei",
    title: "Director, School of Mechanical & Aeronautical Engineering, Singapore Polytechnic",
    pdfPath: "assets/Clement_Toh_SP Testimonial.pdf"
  }
];

export const LEADERSHIP_DOSSIER = [
  {
    title: "Mentorship Program Participant",
    organization: "Harvard Business School Club of Singapore (HBSCS)",
    period: "Oct 2020 – May 2021",
    description: "Selected for an exclusive 8-month strategic development cohort. Mentored directly by Sanjay Kaul (President-APAC & Japan, Cisco Systems) and Mehak Dua (Client Coverage, GMO). Analyzed corporate mechatronics, logistics, and international supply chain models.",
    pdfPath: "assets/Clement_Toh_Harvard Business School Certificate.pdf"
  },
  {
    title: "Zero To One Entrepreneurship Cohort",
    organization: "NUS Business School & Meet Ventures",
    period: "Feb 2021 – Aug 2021",
    description: "Participated in an intensive business accelerator program bridging academic research with industry implementation. Modeled go-to-market strategies for automated manufacturing products.",
    pdfPath: "assets/Clement_Toh_The Zero To One Entrepreneurship Program (NUS Business School and Meet Ventures).pdf"
  },
  {
    title: "Grassroots Volunteer & Tutoring Organizer",
    organization: "Boon Lay Youth Network",
    period: "Jan 2022 – Dec 2023",
    description: "Directed community academic-support initiatives for underprivileged students. Coordinated 20 volunteer educators and managed tutoring breakout pipelines.",
    pdfPath: "assets/Clement_Toh_Certificate of Appointment_Boon Lay Youth Network.pdf"
  }
];

export const DOCUMENT_REGISTRY: DocumentResource[] = [
  {
    name: "Clement Toh - Resume",
    category: "Career Resume",
    path: "assets/Clement_Toh_US_Hardware_Engineering_2027.pdf",
    description: "Resume targeting US Hardware Validation & Systems Co-Ops for 2027"
  },
  {
    name: "A*STAR (A-Star) Project Research Report",
    category: "Technical Report",
    path: "https://drive.google.com/file/d/1W9TOhxwTP4rxf40mj0UgdFuoLkpxVE1q/view?usp=sharing",
    description: ""
  },
  {
    name: "A*STAR (A-Star) Project Summary Poster",
    category: "Research Poster",
    path: "https://drive.google.com/file/d/1bqPkzb7tGjqC66I2I_as3Gb2MobRNwhw/view?usp=sharing",
    description: ""
  },
  {
    name: "A*STAR Senior Scientist Recommendation Letter",
    category: "Recommendation Letter",
    path: "assets/Clement_Toh_ARTC Testimonial.pdf",
    description: ""
  },
  {
    name: "Singapore Polytechnic Director's Testimonial",
    category: "Recommendation Letter",
    path: "assets/Clement_Toh_SP Testimonial.pdf",
    description: ""
  },
  {
    name: "School of MAE Book Prize Certificate",
    category: "Academic Honor",
    path: "assets/Clement_Toh_SP Book Prize.pdf",
    description: ""
  },
  {
    name: "SAF Armour Simulation Commander's Testimonial",
    category: "Military Testimonial",
    path: "assets/Clement_Toh_National Service Testimonial.pdf",
    description: ""
  },
  {
    name: "SAF National Service Certificate of Service",
    category: "Military Certificate",
    path: "assets/Clement_Toh_National Service Certificate of Service.pdf",
    description: ""
  },
  {
    name: "Harvard Business School Mentorship Certificate",
    category: "Leadership Award",
    path: "assets/Clement_Toh_Harvard Business School Certificate.pdf",
    description: ""
  },
  {
    name: "NUS / Meet Ventures Zero-To-One Certificate",
    category: "Entrepreneurship Award",
    path: "assets/Clement_Toh_The Zero To One Entrepreneurship Program (NUS Business School and Meet Ventures).pdf",
    description: ""
  },
  {
    name: "Internet of Things Build Certification",
    category: "Technical Certification",
    path: "assets/Clement_Toh_Build Your Own Internet of Things Certification.pdf",
    description: ""
  },
  {
    name: "Grassroots Boon Lay Appointment Letter",
    category: "Leadership Award",
    path: "assets/Clement_Toh_Certificate of Appointment_Boon Lay Youth Network.pdf",
    description: ""
  }
];
