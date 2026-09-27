import { useMemo, useState, useCallback, useRef, memo } from "react";
import {
  createMeasurementConfigs,
  SIZES,
  BODY_TYPE_ADJUSTMENTS,
  FIT_MULTIPLIERS,
  type BodyTypeKey,
  type FitStyleKey,
} from "@/data/measurements";

interface GlassSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  defaultValue: number;
  disabled?: boolean;
}

const GlassSlider = memo(function GlassSlider({ label, value, onChange, min, max, step, unit, defaultValue, disabled }: GlassSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState<number | null>(null);

  const displayValue = dragValue ?? value;
  const percentage = ((displayValue - min) / (max - min)) * 100;

  const sliderRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const newPercentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const newValue = min + (newPercentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    setDragValue(clampedValue);
    onChange(clampedValue);
  }, [min, max, step, onChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateFromClientX(e.clientX);
    const handleMouseMove = (e: MouseEvent) => updateFromClientX(e.clientX);
    const handleMouseUp = () => {
      setIsDragging(false);
      setDragValue(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [disabled, updateFromClientX]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateFromClientX(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => updateFromClientX(e.touches[0].clientX);
    const handleTouchEnd = () => {
      setIsDragging(false);
      setDragValue(null);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  }, [disabled, updateFromClientX]);

  const handleReset = useCallback(() => {
    setDragValue(null);
    onChange(defaultValue);
  }, [defaultValue, onChange]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
        <label style={{ 
          width: "100%",
          maxWidth: 100,
          fontSize: "clamp(11px, 1.5vw, 13px)", 
          fontWeight: 600,
          color: "#1a1a1a",
          whiteSpace: "nowrap"
        }}>
          {label}
        </label>
        <div style={{ flex: 1, position: "relative" }}>
          <div
            ref={sliderRef}
            className="glass"
            style={{
              height: 6,
              borderRadius: 3,
              position: "relative",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.5 : 1,
              padding: 1,
              background: "rgba(0,0,0,0.04)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "inset 0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.3) inset",
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${percentage}%`,
                background: "linear-gradient(90deg, rgba(0,0,0,0.9), rgba(0,0,0,0.6))",
                borderRadius: "2px 0 0 2px",
                pointerEvents: "none",
                boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: `${percentage}%`,
                top: "50%",
                transform: `translate(-50%, -50%) ${isDragging ? 'scale(1.2)' : 'scale(1)'}`,
                width: 14,
                height: 14,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                border: "2px solid #000",
                borderRadius: "50%",
                boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.25)" : "0 2px 8px rgba(0,0,0,0.15)",
                transition: "transform 0.1s ease, background 0.1s ease, box-shadow 0.1s ease",
                zIndex: 2,
              }}
            />
          </div>
        </div>
        <div style={{ 
          minWidth: 45,
          textAlign: "right",
          fontSize: "clamp(11px, 1.5vw, 13px)",
          fontWeight: 700,
          color: "#1a1a1a",
        }}>
          {displayValue.toFixed(step < 1 ? 1 : 0)} {unit}
        </div>
        <button
          onClick={handleReset}
          disabled={disabled}
          className="glass-button"
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
            padding: 0,
            transition: "all 0.2s ease",
          }}
          aria-label={`Reset ${label} to default`}
          title="Reset to default"
        >
          ⟳
        </button>
      </div>
    </div>
  );
});

export default function SizeSlider() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [userHeight, setHeight] = useState(170);
  const [userWeight, setWeight] = useState(70);
  const [userChest, setChest] = useState(95);
  const [userWaist, setWaist] = useState(80);
  const [userNeck, setNeck] = useState(38);
  const [userShoulder, setShoulder] = useState(45);
  const [userSleeve, setSleeve] = useState(63);
  const [userBicep, setBicep] = useState(32);
  const [isCm, setIsCm] = useState(true);
  const [isKg, setIsKg] = useState(true);

  const [bodyType, setBodyType] = useState<BodyTypeKey>("hourglass");

  const handleGenderChange = useCallback((g: "male" | "female") => {
    setGender(g);
    if (g === "male") {
      setHeight(175); setWeight(75); setChest(100); setWaist(85);
      setNeck(39); setShoulder(46); setSleeve(65); setBicep(33);
    } else {
      setHeight(163); setWeight(58); setChest(88); setWaist(70);
      setNeck(34); setShoulder(40); setSleeve(58); setBicep(27);
    }
  }, []);

  const setAverage = useCallback(() => {
    handleGenderChange(gender);
  }, [gender, handleGenderChange]);

  const getBestSize = useMemo(() => {
    const measurements = {
      chest: userChest,
      waist: userWaist,
      neck: userNeck,
      shoulder: userShoulder,
      sleeve: userSleeve,
      bicep: userBicep,
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
    };

    let bestSize = "M";
    let bestScore = Infinity;

    for (const size of SIZES) {
      let score = 0;
      const m = size.measurements;

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

      const hRange = size.heightRange;
      if (userHeight < hRange.min) {
        score += (hRange.min - userHeight) * 2.0;
      } else if (userHeight > hRange.max) {
        score += (userHeight - hRange.max) * 2.0;
      } else {
        const center = (hRange.min + hRange.max) / 2;
        score += Math.abs(userHeight - center) * 0.5;
      }

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

  const setters = useMemo(() => ({
    setHeight,
    setWeight,
    setChest,
    setWaist,
    setNeck,
    setShoulder,
    setSleeve,
    setBicep,
  }), [setHeight, setWeight, setChest, setWaist, setNeck, setShoulder, setSleeve, setBicep]);

  const stateValues = useMemo(() => ({
    height: userHeight,
    weight: userWeight,
    chest: userChest,
    waist: userWaist,
    neck: userNeck,
    shoulder: userShoulder,
    sleeve: userSleeve,
    bicep: userBicep,
  }), [userHeight, userWeight, userChest, userWaist, userNeck, userShoulder, userSleeve, userBicep]);

  const measurements = useMemo(
    () => createMeasurementConfigs(isCm, isKg, setters, stateValues),
    [isCm, isKg, setters, stateValues]
  );

  return (
    <div className="glass" style={{ 
      padding: "12px 16px", 
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box"
    }}>
      <div style={{ 
        textAlign: "center", 
        marginBottom: 10,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        paddingBottom: 8
      }}>
        <h2 className="glass-title" style={{ 
          fontSize: "clamp(16px, 3vw, 20px)", 
          textTransform: "uppercase", 
          letterSpacing: "1px", 
          margin: "0 0 4px"
        }}>
          Nguyen Dinh Hieu
        </h2>
        <p className="glass-subtitle" style={{ 
          margin: 0, 
          fontSize: "clamp(11px, 1.5vw, 13px)",
        }}>
          Tailor Fit Finder · Flutter Developer Portfolio
        </p>
      </div>

      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "8px", 
        marginBottom: 12,
        justifyContent: "center"
      }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button
            className={`glass-button ${gender === "male" ? 'selected' : 'secondary'}`}
            onClick={() => handleGenderChange("male")}
            style={{ padding: "6px 10px", fontSize: 11 }}
          >
            Male
          </button>
          <button
            className={`glass-button ${gender === "female" ? 'selected' : 'secondary'}`}
            onClick={() => handleGenderChange("female")}
            style={{ padding: "6px 10px", fontSize: 11 }}
          >
            Female
          </button>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button
            className={`glass-button ${isCm ? 'selected' : 'secondary'}`}
            onClick={() => setIsCm(true)}
            style={{ padding: "6px 10px", fontSize: 11 }}
          >
            cm
          </button>
          <button
            className={`glass-button ${!isCm ? 'selected' : 'secondary'}`}
            onClick={() => setIsCm(false)}
            style={{ padding: "6px 10px", fontSize: 11 }}
          >
            ft/in
          </button>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button
            className={`glass-button ${isKg ? 'selected' : 'secondary'}`}
            onClick={() => setIsKg(true)}
            style={{ padding: "6px 10px", fontSize: 11 }}
          >
            kg
          </button>
          <button
            className={`glass-button ${!isKg ? 'selected' : 'secondary'}`}
            onClick={() => setIsKg(false)}
            style={{ padding: "6px 10px", fontSize: 11 }}
          >
            lbs
          </button>
        </div>
        <select
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value as BodyTypeKey)}
          className="glass-select"
          style={{ padding: "6px 10px", fontSize: 11, maxWidth: 160 }}
        >
          <option value="hourglass">Hourglass</option>
          <option value="triangle">Triangle</option>
          <option value="square">Square</option>
          <option value="rectangle">Rectangle</option>
          <option value="inverted-triangle">Inverted Triangle</option>
        </select>
        <button
          className="glass-button"
          onClick={setAverage}
          style={{ padding: "6px 10px", fontSize: 11 }}
        >
          Set Average
        </button>
      </div>

      <div style={{ 
        display: "grid", 
        gap: 6,
        maxWidth: "100%"
      }}>
        {measurements.map((m, index) => (
          <GlassSlider
            key={index}
            label={m.label}
            value={m.value}
            onChange={m.setValue}
            min={m.min}
            max={m.max}
            step={m.step}
            unit={m.unit}
            defaultValue={m.defaultValue}
          />
        ))}
      </div>

      <div style={{ 
        borderTop: "1px solid rgba(0,0,0,0.1)", 
        paddingTop: 12, 
        marginTop: 12,
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 8,
      }}>
        <div>
          <label style={{ 
            fontSize: "clamp(10px, 1.5vw, 12px)", 
            color: "#666", 
            display: "block", 
            marginBottom: 4,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Fit Reference
          </label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { label: "Slim", size: fitSizes.slim },
              { label: "Regular", size: fitSizes.regular },
              { label: "Relaxed", size: fitSizes.relaxed },
              { label: "Oversized", size: fitSizes.oversized },
            ].map((fit) => (
              <div
                key={fit.label}
                className="glass-accent"
                style={{ 
                  padding: "6px 10px", 
                  fontSize: "clamp(10px, 1.5vw, 12px)",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {fit.label}: {fit.size}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", paddingTop: 4 }}>
          <p className="glass-subtitle" style={{ 
            fontSize: "clamp(10px, 1.5vw, 12px)", 
            marginBottom: 6,
          }}>
            Recommended Size (Regular):
          </p>
          <div className="glass" style={{ 
            fontWeight: 700, 
            fontSize: "clamp(22px, 5vw, 36px)", 
            color: "#000",
            lineHeight: 1,
            display: "inline-block",
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 12,
            padding: "8px 24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.6) inset",
          }}>
            {fitSizes.regular}
          </div>
        </div>
      </div>
    </div>
  );
}