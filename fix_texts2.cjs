const fs = require('fs');
let content = fs.readFileSync('src/components/TelemetryDashboard.tsx', 'utf8');

// 1. Text replacement
content = content.replace(
  'Inject active failures to test my telemetry pipelines. Isolate stepper-motor noise spikes, detect mechanical jams, and shut down before mechanical structures warp.',
  'Inject active failures to test my telemetry pipelines. Detect mechanical jams, and shut down before printing structure warp.'
);

// 2. Code snippet replacement
const oldSnippet = `// C++/Platform.io Real-time Recoater Anomaly Filter
#define SAMPLING_RATE_HZ 2000
#define VIBRATION_THRESHOLD_UM 1.20
#define STRAIN_THRESHOLD_MSTR 250.0

struct TelemetryTick {
  float vibration_amplitude_um;
  float shear_strain_mstr;
  uint32_t timestamp_ms;
};

// Moving window average filter to suppress stepper motor EMF noise
float applyMovingAverageFilter(float raw_value, float* buffer, int size) {
  float sum = 0.0;
  for (int i = size - 1; i > 0; i--) {
    buffer[i] = buffer[i - 1];
    sum += buffer[i];
  }
  buffer[0] = raw_value;
  sum += raw_value;
  return sum / size;
}

bool checkMechanicalAnomaly(TelemetryTick tick) {
  // Trigger emergency interrupt and buffer rollback if mechanical threshold breached
  if (tick.vibration_amplitude_um > VIBRATION_THRESHOLD_UM && 
      tick.shear_strain_mstr > STRAIN_THRESHOLD_MSTR) {
    digitalWrite(MCU_ALERT_PIN, HIGH); // Assert hardware interrupt line
    publishToInfluxDB("recoater_anomaly", "CRITICAL_JAM", tick);
    return true;
  }
  return false;
}`;

const newSnippet = `// C++/Platform.io Real-time Recoater Anomaly Filter
#define SAMPLING_RATE_HZ 2000
#define VIBRATION_THRESHOLD_UM 1.20
#define STRAIN_THRESHOLD_MSTR 250.0`;

content = content.replace(oldSnippet, newSnippet);

fs.writeFileSync('src/components/TelemetryDashboard.tsx', content);
