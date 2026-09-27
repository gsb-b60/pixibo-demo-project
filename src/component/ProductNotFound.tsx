import { Link } from "react-router-dom";

export default function ProductNotFound() {
  return (
    <div style={{ padding: "20px 16px", textAlign: "center" }}>
      <p>
        Product not found.{" "}
        <Link to="/" className="glass-button">
          ← Back to products
        </Link>
      </p>
    </div>
  );
}