export type BinColor = "blue" | "green" | "red" | "black" | "yellow";

export interface UpcyclingIdea {
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Creative";
  savedCostOrUtility: string;
}

export interface ContaminationWarning {
  isRisk: boolean;
  details: string;
  preventionStep: string;
}

export interface SustainabilityImpact {
  co2eSavedKg: number;
  landfillDivertedKg: number;
  waterPreservedLiters: number;
  ecoPoints: number;
}

export interface SDGAlignment {
  primaryGoal: string;
  target: string;
  summary: string;
}

export interface ClassificationResult {
  itemName: string;
  confidenceScore: number;
  primaryCategory: "Dry / Recyclable" | "Wet / Organic" | "E-Waste / Hazardous" | "Sanitary / Landfill Residual" | "Reusable / Upcyclable" | string;
  binColorCode: BinColor;
  binName: string;
  materialComposition: string[];
  contaminationWarning: ContaminationWarning;
  stepByStepDisposal: string[];
  upcyclingIdeas: UpcyclingIdea[];
  sustainabilityImpact: SustainabilityImpact;
  sdgAlignment: SDGAlignment;
  funFact: string;
  imagePreviewUrl?: string;
  timestamp?: number;
}

export interface PresetItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  image: string;
  description: string;
  query: string;
}

export type ChatPersona = "advisor" | "fast_sorter" | "upcycler" | "auditor";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: number;
  modelUsed?: string;
  persona?: ChatPersona;
}
