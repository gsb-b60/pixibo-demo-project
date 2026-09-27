import { useState, useCallback } from "react";
import ProductList from "@/component/ProductList";
import SizeSlider from "@/component/size-recommend-section";

function Home() {
  const [position, setPosition] = useState({ x: 24, y: 24 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.drag-handle')) {
      e.stopPropagation();
      setIsDragging(true);
      const startX = e.clientX - position.x;
      const startY = e.clientY - position.y;
      
      const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX - startX, y: e.clientY - startY });
      };
      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }, [position]);

  return (
    <>
      <section style={{ padding: "24px 16px", maxWidth: "1200px", margin: "0 auto" }}>
        <div 
          className="glass" 
          style={{ 
            padding: "24px", 
            position: isDragging ? "fixed" : "relative", 
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.3)",
            left: isDragging ? position.x : undefined,
            top: isDragging ? position.y : undefined,
            zIndex: isDragging ? 100 : 1,
            cursor: isDragging ? "grabbing" : "default",
            maxWidth: "480px",
            transition: isDragging ? "none" : "all 0.3s ease",
            boxShadow: isDragging ? "0 20px 60px rgba(0,0,0,0.2)" : undefined,
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
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="drag-handle" style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              padding: "8px",
              background: "rgba(0,0,0,0.05)",
              borderRadius: "8px",
              cursor: "grab",
              userSelect: "none",
              touchAction: "none",
            }} onMouseDown={handleMouseDown}>
              <span style={{ 
                fontSize: "clamp(16px, 3vw, 22px)", 
                textTransform: "uppercase", 
                letterSpacing: "1px",
                fontWeight: 700,
                color: "#000",
              }}>
                ⋮⋮ Tailor Fit Finder
              </span>
              <span style={{ fontSize: 12, color: "rgba(0,0,0,0.4)" }}>Drag to move</span>
            </div>
            <SizeSlider />
          </div>
        </div>
      </section>
      <ProductList />
    </>
  );
}

export default Home;
