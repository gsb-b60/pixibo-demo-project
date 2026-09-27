import { memo } from "react";
import type { ProductImage } from "@/types/womens-fashion";

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ProductImage[];
  selectedIndex: number;
  onNavigate: (direction: number) => void;
}

export default memo(function ZoomModal({ isOpen, onClose, images, selectedIndex, onNavigate }: ZoomModalProps) {
  if (!isOpen || images.length === 0) return null;

  const currentImage = images[selectedIndex];

  return (
    <div
      className="zoom-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image zoom"
    >
      <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="zoom-modal-close" onClick={onClose} aria-label="Close zoom">
          ✕
        </button>
        <button
          className="zoom-modal-nav prev"
          onClick={() => onNavigate(-1)}
          aria-label="Previous image"
          disabled={images.length <= 1}
        >
          ‹
        </button>
        <img
          className="zoom-modal-image"
          src={currentImage.image_url}
          alt={currentImage.title}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          className="zoom-modal-nav next"
          onClick={() => onNavigate(1)}
          aria-label="Next image"
          disabled={images.length <= 1}
        >
          ›
        </button>
        <div className="glass-accent" style={{ marginTop: 16, fontSize: 13 }}>
          {selectedIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
});