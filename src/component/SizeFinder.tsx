import SizeSlider from "@/component/size-recommend-section";

export default function SizeFinder() {
  return (
    <div
      className="glass"
      style={{
        padding: "clamp(16px, 3vw, 24px)",
        position: "relative",
        overflow: "hidden",
        width: "100%",
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
          fontSize: "clamp(18px, 2.5vw, 22px)",
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