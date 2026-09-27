import { useParams } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProducts } from "@/store/productsSlice";
import {
  setZoomed,
  setSelectedImageIndex,
  navigateImage,
  resetDetail,
} from "@/store/productDetailSlice";
import ImageGallery from "@/component/ImageGallery";
import ProductInfo from "@/component/ProductInfo";
import SizeFinder from "@/component/SizeFinder";
import ZoomModal from "@/component/ZoomModal";
import ProductNotFound from "@/component/ProductNotFound";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { items: products, loading } = useAppSelector((state) => state.products);
  const { isZoomed, selectedImageIndex } = useAppSelector((state) => state.productDetail);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading]);

  useEffect(() => {
    dispatch(resetDetail());
  }, [dispatch, id]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isZoomed) return;
      if (e.key === "Escape") dispatch(setZoomed(false));
      if (e.key === "ArrowLeft")
        dispatch(navigateImage({ direction: -1, total: product?.images?.length || 0 }));
      if (e.key === "ArrowRight")
        dispatch(navigateImage({ direction: 1, total: product?.images?.length || 0 }));
    },
    [dispatch, isZoomed, product?.images?.length],
  );

  useEffect(() => {
    if (isZoomed) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isZoomed, handleKeyDown]);

  if (loading) {
    return (
      <div style={{ padding: "40px 16px", textAlign: "center", color: "#666" }}>
        Loading...
      </div>
    );
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const images = product.images || [];
  const productData = product.product_data;

  return (
    <div style={{ padding: "24px 16px", maxWidth: "1200px", margin: "0 auto" }}>
      <Link to="/" className="glass-button" style={{ marginBottom: 20, display: "inline-flex" }}>
        ← Back to products
      </Link>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 16 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr",
            gap: 24,
          }}
        >
          <ImageGallery
            images={images}
            selectedIndex={selectedImageIndex}
            onSelectImage={(index) => dispatch(setSelectedImageIndex(index))}
            onOpenZoom={() => dispatch(setZoomed(true))}
          />
          <SizeFinder />
        </div>

        <ProductInfo productData={productData} />
      </div>

      <ZoomModal
        isOpen={isZoomed}
        onClose={() => dispatch(setZoomed(false))}
        images={images}
        selectedIndex={selectedImageIndex}
        onNavigate={(direction) =>
          dispatch(navigateImage({ direction, total: images.length }))
        }
      />
    </div>
  );
}