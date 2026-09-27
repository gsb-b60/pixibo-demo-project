import { memo, useMemo } from "react";
import type { ProductImage } from "@/types/womens-fashion";

interface ImageGalleryProps {
  images: ProductImage[];
  selectedIndex: number;
  onSelectImage: (index: number) => void;
  onOpenZoom: () => void;
}

const ThumbnailButton = memo(function ThumbnailButton({ 
  img, 
  index, 
  isActive, 
  onClick 
}: { 
  img: ProductImage; 
  index: number; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      className={`image-gallery-thumb ${isActive ? "active" : ""}`}
      onClick={onClick}
      aria-label={`View image ${index + 1}: ${img.title}`}
      aria-current={isActive ? "true" : "false"}
      style={{ position: "relative" }}
    >
      <div
        className="glass-card"
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <img
          src={img.thumbnail_url || img.image_url}
          alt={img.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          loading="lazy"
        />
      </div>
      {index === 0 && (
        <span
          className="glass-accent"
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            fontSize: 10,
            padding: "4px 8px",
          }}
        >
          MAIN
        </span>
      )}
    </button>
  );
});

export default memo(function ImageGallery({ images, selectedIndex, onSelectImage, onOpenZoom }: ImageGalleryProps) {
  const currentImage = images[selectedIndex] || images[0];

  const thumbnails = useMemo(() => 
    images.map((img, index) => (
      <ThumbnailButton
        key={img.id}
        img={img}
        index={index}
        isActive={index === selectedIndex}
        onClick={() => onSelectImage(index)}
      />
    )),
    [images, selectedIndex, onSelectImage]
  );

  return (
    <div className="sticky top-4 md:top-24">
      <div className="image-gallery">
        <div
          className="glass-card product-card"
          onClick={onOpenZoom}
          style={{ cursor: "zoom-in", overflow: "hidden", borderRadius: 20 }}
        >
          <div
            className="glass-card-shine"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
          {currentImage && (
            <img
              src={currentImage.image_url}
              alt={currentImage.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              loading="lazy"
            />
          )}
          <div
            className="glass-accent"
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              fontSize: 12,
              padding: "8px 14px",
            }}
          >
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
        <div className="image-gallery-thumbs" role="list" aria-label="Product images">
          {thumbnails}
        </div>
      </div>
    </div>
  );
});