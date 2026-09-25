import type { BodyType, FitStyle, SizeChart } from "@/types/size-chart";
import sizeChart from "@/data/size-chart.json";
import { Box, Slider, Typography } from "@mui/material";
import { useMemo, useState } from "react";

export default function SizeSlider() {
  const SIZES = (sizeChart as SizeChart).sizes;
  const BODY_TYPE_ADJUSTMENTS = (sizeChart as SizeChart).bodyTypeAdjustments;
  const FIT_MULTIPLIERS = (sizeChart as SizeChart).fitMultipliers;

  type BodyTypeKey = BodyType;
  type FitStyleKey = FitStyle;

  const [userHeight, setHeight] = useState(170);
  const [userWeight, setWeight] = useState(70);
  const [userChest, setChest] = useState(95);
  const [userWaist, setWaist] = useState(80);
  const [userNeck, setNeck] = useState(38);
  const [userShoulder, setShoulder] = useState(45);
  const [userSleeve, setSleeve] = useState(63);
  const [userBicep, setBicep] = useState(32);
  const [userWrist, setWrist] = useState(17);
  const [isCm, setIsCm] = useState(true);
  const [isKg, setIsKg] = useState(true);

  const [bodyType, setBodyType] = useState<BodyTypeKey>("hourglass");

  const setAverage = () => {
    setHeight(175);
    setWeight(75);
    setChest(100);
    setWaist(85);
    setNeck(39);
    setShoulder(46);
    setSleeve(65);
    setBicep(33);
    setWrist(17.5);
  };

  const heightInDisplayUnit = isCm ? userHeight : userHeight / 30.48;
  const weightInDisplayUnit = isKg ? userWeight : userWeight * 2.20462;
  const chestInDisplayUnit = isCm ? userChest : userChest / 2.54;
  const waistInDisplayUnit = isCm ? userWaist : userWaist / 2.54;
  const neckInDisplayUnit = isCm ? userNeck : userNeck / 2.54;
  const shoulderInDisplayUnit = isCm ? userShoulder : userShoulder / 2.54;
  const sleeveInDisplayUnit = isCm ? userSleeve : userSleeve / 2.54;
  const bicepInDisplayUnit = isCm ? userBicep : userBicep / 2.54;
  const wristInDisplayUnit = isCm ? userWrist : userWrist / 2.54;

  const getBestSize = useMemo(() => {
    const measurements = {
      chest: userChest,
      waist: userWaist,
      neck: userNeck,
      shoulder: userShoulder,
      sleeve: userSleeve,
      bicep: userBicep,
      wrist: userWrist,
    };

    const adjustments = BODY_TYPE_ADJUSTMENTS[bodyType] || {
      chest: 0,
      waist: 0,
      shoulder: 0,
    };
    const adjustedMeasurements = {
      chest: measurements.chest + adjustments.chest,
      waist: measurements.waist + adjustments.waist,
      neck: measurements.neck,
      shoulder: measurements.shoulder + adjustments.shoulder,
      sleeve: measurements.sleeve,
      bicep: measurements.bicep,
      wrist: measurements.wrist,
    };

    let bestSize = "M";
    let bestScore = Infinity;

    for (const size of SIZES) {
      let score = 0;
      const m = size.measurements;

      // Body measurements - weighted lower
      for (const [key, value] of Object.entries(adjustedMeasurements)) {
        const range = m[key as keyof typeof m];
        if (range) {
          if (value < range.min) {
            score += (range.min - value) * 1.5;
          } else if (value > range.max) {
            score += (value - range.max) * 1.5;
          } else {
            const center = (range.min + range.max) / 2;
            score += Math.abs(value - center) * 0.3;
          }
        }
      }

      // Height - higher weight
      const hRange = size.heightRange;
      if (userHeight < hRange.min) {
        score += (hRange.min - userHeight) * 2.0;
      } else if (userHeight > hRange.max) {
        score += (userHeight - hRange.max) * 2.0;
      } else {
        const center = (hRange.min + hRange.max) / 2;
        score += Math.abs(userHeight - center) * 0.5;
      }

      // Weight - highest weight
      const wRange = size.weightRange;
      if (userWeight < wRange.min) {
        score += (wRange.min - userWeight) * 3.0;
      } else if (userWeight > wRange.max) {
        score += (userWeight - wRange.max) * 3.0;
      } else {
        const center = (wRange.min + wRange.max) / 2;
        score += Math.abs(userWeight - center) * 1.0;
      }

      if (score < bestScore) {
        bestScore = score;
        bestSize = size.label;
      }
    }

    return bestSize;
  }, [
    userChest,
    userWaist,
    userNeck,
    userShoulder,
    userSleeve,
    userBicep,
    userWrist,
    userHeight,
    userWeight,
    bodyType,
  ]);

  const fitSizes = useMemo(() => {
    const baseSize = getBestSize;
    const sizeIndex = SIZES.findIndex((s) => s.label === baseSize);
    const multipliers = FIT_MULTIPLIERS;

    const getSizeForFit = (fitStyle: FitStyleKey): string => {
      const multiplier = multipliers[fitStyle];
      const baseChest = SIZES[sizeIndex]?.measurements.chest.min || 96;
      const targetChest = baseChest * multiplier;

      let bestSize = baseSize;
      let bestDiff = Infinity;

      for (const size of SIZES) {
        const chestCenter =
          (size.measurements.chest.min + size.measurements.chest.max) / 2;
        const diff = Math.abs(chestCenter - targetChest);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestSize = size.label;
        }
      }

      return bestSize;
    };

    return {
      slim: getSizeForFit("slim"),
      regular: getSizeForFit("regular"),
      relaxed: getSizeForFit("relaxed"),
      oversized: getSizeForFit("oversized"),
    };
  }, [getBestSize]);

  const measurements = [
    {
      label: "Height",
      value: heightInDisplayUnit,
      setValue: setHeight,
      defaultValue: 175,
      min: isCm ? 50 : 50 / 30.48,
      max: isCm ? 272 : 272 / 30.48,
      step: isCm ? 1 : 1 / 30.48,
      unit: isCm ? "cm" : "ft",
    },
    {
      label: "Weight",
      value: weightInDisplayUnit,
      setValue: setWeight,
      defaultValue: 75,
      min: isKg ? 15 : 33,
      max: isKg ? 200 : 440,
      step: isKg ? 1 : 1,
      unit: isKg ? "kg" : "lbs",
    },
    {
      label: "Chest",
      value: chestInDisplayUnit,
      setValue: setChest,
      defaultValue: 100,
      min: isCm ? 70 : 27,
      max: isCm ? 140 : 55,
      step: isCm ? 1 : 0.5,
      unit: isCm ? "cm" : "in",
    },
    {
      label: "Waist",
      value: waistInDisplayUnit,
      setValue: setWaist,
      defaultValue: 85,
      min: isCm ? 60 : 23,
      max: isCm ? 130 : 51,
      step: isCm ? 1 : 0.5,
      unit: isCm ? "cm" : "in",
    },
    {
      label: "Neck",
      value: neckInDisplayUnit,
      setValue: setNeck,
      defaultValue: 39,
      min: isCm ? 30 : 12,
      max: isCm ? 50 : 20,
      step: isCm ? 0.5 : 0.5,
      unit: isCm ? "cm" : "in",
    },
    {
      label: "Shoulder Width",
      value: shoulderInDisplayUnit,
      setValue: setShoulder,
      defaultValue: 46,
      min: isCm ? 35 : 14,
      max: isCm ? 60 : 24,
      step: isCm ? 0.5 : 0.5,
      unit: isCm ? "cm" : "in",
    },
    {
      label: "Sleeve Length",
      value: sleeveInDisplayUnit,
      setValue: setSleeve,
      defaultValue: 65,
      min: isCm ? 55 : 22,
      max: isCm ? 75 : 30,
      step: isCm ? 0.5 : 0.5,
      unit: isCm ? "cm" : "in",
    },
    {
      label: "Bicep",
      value: bicepInDisplayUnit,
      setValue: setBicep,
      defaultValue: 33,
      min: isCm ? 25 : 10,
      max: isCm ? 45 : 18,
      step: isCm ? 0.5 : 0.5,
      unit: isCm ? "cm" : "in",
    },
    {
      label: "Wrist",
      value: wristInDisplayUnit,
      setValue: setWrist,
      defaultValue: 17.5,
      min: isCm ? 15 : 6,
      max: isCm ? 22 : 9,
      step: isCm ? 0.5 : 0.5,
      unit: isCm ? "cm" : "in",
    },
  ];
  return (
    <>
      <div style={{ padding: 20 }}>
        <Typography variant="h3" gutterBottom>
          pixibo
        </Typography>
        <Typography variant="h5" gutterBottom>
          tailor - find your fix
        </Typography>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setIsCm(true)}
              style={{ fontWeight: isCm ? "bold" : "normal" }}
            >
              cm
            </button>
            <button
              onClick={() => setIsCm(false)}
              style={{ fontWeight: !isCm ? "bold" : "normal" }}
            >
              ft/in
            </button>
          </div>
          <div style={{ display: "flex", gap: 10, marginLeft: 20 }}>
            <button
              onClick={() => setIsKg(true)}
              style={{ fontWeight: isKg ? "bold" : "normal" }}
            >
              kg
            </button>
            <button
              onClick={() => setIsKg(false)}
              style={{ fontWeight: !isKg ? "bold" : "normal" }}
            >
              lbs
            </button>
          </div>
          <button
            onClick={setAverage}
            style={{
              marginLeft: 20,
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Set Average
          </button>
        </div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
          }}
        >
          {measurements.map((m, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ minWidth: 160 }}>
                <Typography variant="body1">
                  {m.label}:{" "}
                  {typeof m.value === "number" ? m.value.toFixed(1) : m.value}{" "}
                  {m.unit}
                </Typography>
              </Box>
              <Slider
                aria-label={m.label}
                value={m.value}
                onChange={(_, newValue) => {
                  const val =
                    typeof newValue === "number" ? newValue : Number(newValue);
                  if (m.label === "Height") {
                    m.setValue(isCm ? val : val * 30.48);
                  } else if (m.label === "Weight") {
                    m.setValue(isKg ? val : val / 2.20462);
                  } else {
                    m.setValue(isCm ? val : val * 2.54);
                  }
                }}
                valueLabelDisplay="auto"
                step={m.step}
                min={m.min}
                max={m.max}
                sx={{ flex: 1 }}
              />
              <button
                onClick={() => m.setValue(m.defaultValue)}
                style={{
                  padding: "6px 8px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  color: "#666",
                  fontSize: 18,
                  lineHeight: 1,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1976d2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                title="Reset to default"
              >
                ⟳
              </button>
            </Box>
          ))}
        </Box>

        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 20,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minWidth: 180,
            }}
          >
            <label style={{ fontSize: 14, color: "#666" }}>Body Type</label>
            <select
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value as BodyTypeKey)}
              style={{
                padding: "10px 12px",
                fontSize: 16,
                border: "1px solid #ccc",
                borderRadius: 4,
                backgroundColor: "white",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="hourglass">Hourglass</option>
              <option value="triangle">Triangle</option>
              <option value="square">Square</option>
              <option value="rectangle">Rectangle</option>
              <option value="inverted-triangle">Inverted Triangle</option>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minWidth: 300,
            }}
          >
            <label style={{ fontSize: 14, color: "#666" }}>Fit Reference</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "Slim", size: fitSizes.slim, color: "#e3f2fd" },
                { label: "Regular", size: fitSizes.regular, color: "#e8f5e9" },
                { label: "Relaxed", size: fitSizes.relaxed, color: "#fff3e0" },
                {
                  label: "Oversized",
                  size: fitSizes.oversized,
                  color: "#fce4ec",
                },
              ].map((fit) => (
                <Box
                  key={fit.label}
                  sx={{
                    padding: "8px 16px",
                    borderRadius: 4,
                    backgroundColor: fit.color,
                    border: "1px solid #ddd",
                    fontWeight: 600,
                    fontSize: 14,
                    whiteSpace: "nowrap",
                  }}
                >
                  {fit.label}: {fit.size}
                </Box>
              ))}
            </div>
          </div>

          <Box sx={{ minWidth: 200 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Recommended Size (Regular):
            </Typography>
            <Typography variant="h6" component="span">
              {fitSizes.regular}
            </Typography>
          </Box>
        </div>
      </div>
    </>
  );
}
