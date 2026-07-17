/**
 * Shared TypeScript types for Clement Toh's interactive systems engineering portfolio.
 */

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface TelemetryData {
  time: number;
  vibration: number;
  strain: number;
  temperature: number;
  laserPower: number;
  anomalyDetected: boolean;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  year: string;
  description: string;
  fullNarrative: string;
  keyMetrics: string[];
  technologies: string[];
  imageSrc?: string;
  cadInteractiveData?: {
    components: Array<{ name: string; type: string; status: string; spec: string }>;
    assemblyWeight: string;
    vibrationSpec: string;
  };
}

export interface CritiqueItem {
  heading: string;
  ruthlessAssessment: string;
  strategicAction: string;
  practicalExample: string;
}

export interface CareerTopic {
  id: string;
  title: string;
  iconName: string;
  brief: string;
  critiques: CritiqueItem[];
}
