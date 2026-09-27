import type { BodyType, FitStyle, SizeChart } from "@/types/size-chart";
import sizeChart from "@/data/size-chart.json";

const SIZES = (sizeChart as SizeChart).sizes;
const BODY_TYPE_ADJUSTMENTS = (sizeChart as SizeChart).bodyTypeAdjustments;
const FIT_MULTIPLIERS = (sizeChart as SizeChart).fitMultipliers;

type BodyTypeKey = BodyType;
type FitStyleKey = FitStyle;

export interface MeasurementConfig {
  label: string;
  defaultValue: number;
  min: (isCm: boolean) => number;
  max: (isCm: boolean) => number;
  step: (isCm: boolean) => number;
  unit: (isCm: boolean) => string;
  setValue: (value: number) => void;
}

export function createMeasurementConfigs(
  isCm: boolean,
  isKg: boolean,
  setters: {
    setHeight: (v: number) => void;
    setWeight: (v: number) => void;
    setChest: (v: number) => void;
    setWaist: (v: number) => void;
    setNeck: (v: number) => void;
    setShoulder: (v: number) => void;
    setSleeve: (v: number) => void;
    setBicep: (v: number) => void;
  },
  values: {
    height: number;
    weight: number;
    chest: number;
    waist: number;
    neck: number;
    shoulder: number;
    sleeve: number;
    bicep: number;
  }
) {
  return [
    {
      label: "Height",
      defaultValue: 175,
      min: isCm ? 50 : 50 / 30.48,
      max: isCm ? 272 : 272 / 30.48,
      step: isCm ? 1 : 1 / 30.48,
      unit: isCm ? "cm" : "ft",
      value: isCm ? values.height : values.height / 30.48,
      setValue: (v: number) => setters.setHeight(isCm ? v : v * 30.48),
    },
    {
      label: "Weight",
      defaultValue: 75,
      min: isKg ? 15 : 33,
      max: isKg ? 200 : 440,
      step: isKg ? 1 : 1,
      unit: isKg ? "kg" : "lbs",
      value: isKg ? values.weight : values.weight * 2.20462,
      setValue: (v: number) => setters.setWeight(isKg ? v : v / 2.20462),
    },
    {
      label: "Chest",
      defaultValue: 100,
      min: isCm ? 70 : 27,
      max: isCm ? 140 : 55,
      step: isCm ? 1 : 0.5,
      unit: isCm ? "cm" : "in",
      value: isCm ? values.chest : values.chest / 2.54,
      setValue: (v: number) => setters.setChest(isCm ? v : v * 2.54),
    },
    {
      label: "Waist",
      defaultValue: 85,
      min: isCm ? 60 : 23,
      max: isCm ? 130 : 51,
      step: isCm ? 1 : 0.5,
      unit: isCm ? "cm" : "in",
      value: isCm ? values.waist : values.waist / 2.54,
      setValue: (v: number) => setters.setWaist(isCm ? v : v * 2.54),
    },
    {
      label: "Neck",
      defaultValue: 39,
      min: isCm ? 30 : 12,
      max: isCm ? 50 : 20,
      step: isCm ? 0.5 : 0.5,
      unit: isCm ? "cm" : "in",
      value: isCm ? values.neck : values.neck / 2.54,
      setValue: (v: number) => setters.setNeck(isCm ? v : v * 2.54),
    },
    {
      label: "Shoulder Width",
      defaultValue: 46,
      min: isCm ? 35 : 14,
      max: isCm ? 60 : 24,
      step: isCm ? 0.5 : 0.5,
      unit: isCm ? "cm" : "in",
      value: isCm ? values.shoulder : values.shoulder / 2.54,
      setValue: (v: number) => setters.setShoulder(isCm ? v : v * 2.54),
    },
    {
      label: "Sleeve Length",
      defaultValue: 65,
      min: isCm ? 55 : 22,
      max: isCm ? 75 : 30,
      step: isCm ? 0.5 : 0.5,
      unit: isCm ? "cm" : "in",
      value: isCm ? values.sleeve : values.sleeve / 2.54,
      setValue: (v: number) => setters.setSleeve(isCm ? v : v * 2.54),
    },
    {
      label: "Bicep",
      defaultValue: 33,
      min: isCm ? 25 : 10,
      max: isCm ? 45 : 18,
      step: isCm ? 0.5 : 0.5,
      unit: isCm ? "cm" : "in",
      value: isCm ? values.bicep : values.bicep / 2.54,
      setValue: (v: number) => setters.setBicep(isCm ? v : v * 2.54),
    },
  ];
}

export { SIZES, BODY_TYPE_ADJUSTMENTS, FIT_MULTIPLIERS, type BodyTypeKey, type FitStyleKey };