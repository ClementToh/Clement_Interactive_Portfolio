const fs = require('fs');
let dataContent = fs.readFileSync('src/data.ts', 'utf8');

const descriptionsToRemove = [
  'description: "Documentation of EOS M 290 12-channel DAQ routing and packet sniffing."',
  'description: "Summarized optomechanical and IIoT results from ARTC."',
  'description: "Official SP Diploma testimonial and endorsement by Director Dr. Chong Chee Wei."',
  'description: "Detailed commanding officer testimonial evaluating systems operator performance and reliability."',
  'description: "Certificate of completion for the 8-month executive club mentorship."',
  'description: "Technical diploma credential for embedded systems and IoT engineering."',
  'description: "Appointment letter as a Boon Lay Youth Network Grassroots Volunteer."',
  'description: "Accredited certificate for finishing the 6-month product commercialization cohort."',
  'description: "Awarded top in cohort for SP communications and team collaboration."',
  'description: "Official Singapore Armed Forces certificate proving successful completion of National Service."',
  'description: "Recommendation letter from Dr. Zheng Jie Tan."'
];

for (const desc of descriptionsToRemove) {
  dataContent = dataContent.replace(desc, 'description: ""');
}

fs.writeFileSync('src/data.ts', dataContent);

