const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const webcamProject = `  {
    id: "webcam-streaming",
    title: "Webcam Streaming in EOS M 290 Chamber",
    subtitle: "Real-time process monitoring via custom HTTP servers",
    company: "A*STAR ARTC",
    year: "Sep 2023",
    description: "Integrated an Anker PowerConf C200 webcam into the EOS M 290 3D printer chamber using a custom port cover and developed a Python-based HTTP streaming server.",
    fullNarrative: "To provide real-time remote monitoring of the laser powder bed fusion (LPBF) process, I integrated an Anker PowerConf C200 webcam directly into the EOS M 290's build chamber. This required a custom-modified port cover with a setscrew mechanism to hold the camera at an optimal angle without obstructing the recoater blade or intersecting the Class 4 laser path. Given the high-temperature environment (up to 50°C), thermal shielding was implemented. I routed a 15cm USB-C cable to a custom PCB to bridge data outside the chamber. To distribute the feed, I developed a Python script utilizing the socketserver module to host a lightweight HTTP server on port 8002, serving a custom HTML interface that allowed engineers to monitor the powder bed layering remotely and abort jobs immediately if defects were observed.",
    keyMetrics: [
      "Secured camera within hazardous Class 4 laser environment with zero beam obstruction",
      "Hosted continuous live HTTP video stream over local network via Python",
      "Enabled remote detection of powder bed anomalies in real-time"
    ],
    technologies: ["Python (http.server)", "HTML/CSS", "Hardware Integration", "Anker PowerConf C200", "Network Streaming"],
    cadInteractiveData: {
      assemblyWeight: "0.4 kg (Camera + Mount)",
      vibrationSpec: "Rigid setscrew mounting",
      components: [
        { name: "Anker PowerConf C200", type: "Webcam", status: "Streaming", spec: "2K resolution, thermal shielded" },
        { name: "Custom Port Cover Mount", type: "Mechanical Fixture", status: "Installed", spec: "Setscrew adjusted, 15cm USB-C routing" },
        { name: "Python HTTP Server", type: "Streaming Server", status: "Active", spec: "Socketserver, Port 8002, MJPG stream" },
        { name: "Live HTML Dashboard", type: "Web Interface", status: "Active", spec: "Remote LAN access, embedded video feed" }
      ]
    }
  },`;

if (!content.includes('id: "webcam-streaming"')) {
  // Insert before printer-thermal
  content = content.replace('id: "printer-thermal"', webcamProject + '\n  {\n    id: "printer-thermal"');
  fs.writeFileSync('src/data.ts', content);
}
