import { useState, useEffect } from "react";
import SizeSlider from "@/component/size-recommend-section";

export default function SizeFinder() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="glass"
      style={{
        padding: isMobile ? 20 : 24,
        position: "relative",
        overflow: "hidden",
        minHeight: isMobile ? "auto" : "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <h2
        className="glass-title"
        style={{
          fontSize: isMobile ? 18 : 22,
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          position: "relative",
          zIndex: 1,
        }}
      >
        Find Your Size
      </h2>
      <SizeSlider />
    </div>
  );
}