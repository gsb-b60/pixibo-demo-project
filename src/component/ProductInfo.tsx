import { memo } from "react";
import type { ProductData } from "@/types/womens-fashion";

interface ProductInfoProps {
  productData: ProductData;
}

export default memo(function ProductInfo({ productData }: ProductInfoProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, gap: 16 }}>
      <div className="glass" style={{ padding: 24, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <p
          style={{
            color: "#1a1a1a",
            lineHeight: 1.7,
            fontSize: "clamp(14px, 2vw, 16px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {productData.short_description}
        </p>
      </div>

      {productData.bullet_points?.length && (
        <div className="glass" style={{ padding: 24, position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
          <h3
            className="glass-title"
            style={{
              fontSize: 18,
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Features
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              color: "#333",
              lineHeight: 1.8,
              fontSize: 15,
              position: "relative",
              zIndex: 1,
            }}
          >
            {productData.bullet_points.map((point, i) => (
              <li
                key={i}
                style={{
                  marginBottom: 12,
                  position: "relative",
                  paddingLeft: 8,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: -20,
                    top: 0,
                    color: "#000",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  •
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {productData.long_description && (
        <div className="glass" style={{ padding: 24, position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
          <p
            style={{
              lineHeight: 1.8,
              color: "#333",
              fontSize: "clamp(14px, 2vw, 16px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {productData.long_description}
          </p>
        </div>
      )}

      {productData.tags?.length && (
        <div
          className="glass-accent"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            fontSize: 13,
            marginBottom: 8,
          }}
        >
          <strong style={{ color: "#fff" }}>Tags:</strong>
          <span style={{ color: "rgba(255,255,255,0.9)" }}>
            {productData.tags.join(", ")}
          </span>
        </div>
      )}

      {productData.categories?.length && (
        <div
          className="glass-accent"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          <strong style={{ color: "#fff" }}>Categories:</strong>
          <span style={{ color: "rgba(255,255,255,0.9)" }}>
            {productData.categories.join(", ")}
          </span>
        </div>
      )}
    </div>
  );
});