import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="page-container" style={{ background: "linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)" }}>
        {/* Header */}
        <header className="header">
          <div className="header-content glass" style={{ padding: "12px 20px", borderRadius: 16, margin: "16px auto", maxWidth: "1200px", boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.4) inset" }}>
            <div>
              <Link to="/" className="header-title glass-title">
                Nguyen Dinh Hieu
              </Link>
              <div className="header-subtitle glass-subtitle" style={{ color: "rgba(0,0,0,0.5)" }}>
                Flutter Developer · Junior Frontend Portfolio
              </div>
            </div>
            <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Link
                to="/"
                className="glass-button"
                style={{ padding: "10px 18px", fontSize: 13 }}
              >
                Home
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "0 16px 40px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="glass" style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px", borderRadius: 24, border: "1px solid rgba(255,255,255,0.3)" }}>
            <div className="footer-content">
              <div className="footer-brand glass-title" style={{ fontSize: "clamp(22px, 4vw, 32px)" }}>Nguyen Dinh Hieu</div>
              <div className="footer-tagline glass-subtitle" style={{ color: "rgba(0,0,0,0.5)" }}>
                Flutter Developer · Junior Frontend · Open for Internship
              </div>
              <p style={{ color: "rgba(0,0,0,0.5)", fontSize: 13, lineHeight: 1.7, maxWidth: 600, margin: "12px auto 0", textAlign: "center" }}>
                A frontend portfolio project built with React, TypeScript, and Redux Toolkit.
                Features product browsing with glassmorphic UI, responsive layouts, and an
                interactive Tailor Fit Finder for clothing size recommendations.
              </p>
              <div className="footer-links" style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                <a
                  href="mailto:dihieu2407@gmail.com"
                  className="glass-button"
                  style={{ padding: "12px 24px" }}
                >
                  dihieu2407@gmail.com
                </a>
                <a
                  href="https://github.com/gsb-b60"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button"
                  style={{ padding: "12px 24px" }}
                >
                  GitHub: gsb-b60
                </a>
                <a
                  href="https://gsb-b60.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button"
                  style={{ padding: "12px 24px" }}
                >
                  Portfolio
                </a>
              </div>
              <div className="footer-copyright glass-subtitle" style={{ color: "rgba(0,0,0,0.4)", marginTop: 20, fontSize: 12 }}>
                Top 10 CS Student · 2nd Prize DLU Code Challenge · Dalat University
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
