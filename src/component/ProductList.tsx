import { useState, useEffect, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProducts } from "@/store/productsSlice";
import type { ScenePack } from "@/types/womens-fashion";

const ProductCard = memo(function ProductCard({ product }: { product: ScenePack }) {
  const productData = product.product_data;
  const thumbnail = product.images?.[0]?.thumbnail_url || product.images?.[0]?.image_url;
  
  return (
    <Link
      to={`/products/${product.id}`}
      state={{ product }}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div className="glass-card product-card" style={{ 
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="glass-card-shine" style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)", pointerEvents: "none" }} />
        {thumbnail && (
          <div style={{ 
            position: "relative",
            overflow: "hidden",
            background: "rgba(0,0,0,0.02)",
            borderRadius: "24px 24px 0 0",
          }}>
            <img
              src={thumbnail}
              alt={productData.product_title}
              style={{ 
                width: "100%", 
                height: 200, 
                objectFit: "cover", 
                flexShrink: 0,
                transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
              }}
              loading="lazy"
            />
            {productData.options?.Size && productData.options.Size.length > 0 && (
              <div style={{ 
                position: "absolute", 
                top: 12, 
                right: 12,
                zIndex: 2
              }}>
                <span className="glass-accent" style={{ fontSize: 11, padding: "6px 12px" }}>
                  {productData.options.Size.slice(0, 3).join(", ")}
                  {productData.options.Size.length > 3 && "+"}
                </span>
              </div>
            )}
          </div>
        )}
        <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1, position: "relative", zIndex: 1 }}>
          <h3 style={{ 
            margin: "0 0 10px", 
            fontSize: 15, 
            lineHeight: 1.35, 
            display: "-webkit-box", 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: "vertical", 
            overflow: "hidden",
            fontWeight: 600,
            color: "#1a1a1a",
            transition: "color 0.3s ease",
          }}>
            {productData.product_title}
          </h3>
          <p style={{ 
            margin: "0 0 14px", 
            color: "rgba(0,0,0,0.5)", 
            fontSize: 13, 
            lineHeight: 1.55, 
            display: "-webkit-box", 
            WebkitLineClamp: 3, 
            WebkitBoxOrient: "vertical", 
            overflow: "hidden", 
            flex: 1
          }}>
            {productData.short_description}
          </p>
          <div style={{ 
            marginTop: "auto", 
            fontWeight: 700, 
            color: "#000", 
            fontSize: 18,
            letterSpacing: "0.3px",
          }}>
            ${productData.price}
          </div>
        </div>
      </div>
    </Link>
  );
});

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { items: products, loading, error } = useAppSelector((state) => state.products);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsTablet(window.innerWidth >= 640);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (products.length === 0 && !loading && !error) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading, error]);

  const gridColumns = useMemo(() => 
    isDesktop ? "repeat(5, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
    [isDesktop, isTablet]
  );

  if (loading) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 18, color: "#666", marginBottom: 16 }}>Loading products...</div>
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: gridColumns,
            gap: 16,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="skeleton"
              style={{
                minHeight: 420,
              }}
            >
              <div style={{ width: "100%", height: 200, background: "rgba(0,0,0,0.04)" }} />
              <div style={{ padding: 12, height: 100, background: "rgba(0,0,0,0.02)" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 16px", textAlign: "center", color: "#000" }}>
        <div className="glass" style={{ padding: "32px 16px", display: "inline-block", maxWidth: 400 }}>
          <p style={{ fontSize: 18, marginBottom: 16, fontWeight: 600 }}>{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="glass-button"
            style={{ padding: "12px 24px", fontSize: 14 }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
      <h2 className="glass-title" style={{ 
        marginBottom: 24, 
        fontSize: "clamp(24px, 4vw, 32px)", 
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        position: "relative",
        zIndex: 1,
      }}>
        Featured Projects
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridColumns,
          gap: 20,
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}