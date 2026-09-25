export interface SizeRange {
  min: number;
  max: number;
}

export interface SizeMeasurements {
  chest: SizeRange;
  waist: SizeRange;
  neck: SizeRange;
  shoulder: SizeRange;
  sleeve: SizeRange;
  bicep: SizeRange;
  wrist: SizeRange;
}

export interface SizeEntry {
  label: string;
  measurements: SizeMeasurements;
  heightRange: SizeRange;
  weightRange: SizeRange;
}

export interface BodyTypeAdjustments {
  chest: number;
  waist: number;
  shoulder: number;
}

export interface FitMultipliers {
  slim: number;
  regular: number;
  relaxed: number;
  oversized: number;
}

export interface SizeChart {
  version: string;
  units: { length: string; weight: string };
  sizes: SizeEntry[];
  bodyTypeAdjustments: Record<string, BodyTypeAdjustments>;
  fitMultipliers: FitMultipliers;
}

export type BodyType = keyof SizeChart['bodyTypeAdjustments'];
export type FitStyle = keyof SizeChart['fitMultipliers'];