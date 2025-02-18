import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import Auth from "./components/Auth";
import AdminDashboard from "./components/AdminDashboard";

import Gallery from "./Pages/Gallery";
import AllProducts from "./Pages/AllProducts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Services from "./components/Services";
import OurProcess from "./components/OurProcess";
import Inspiration from "./components/Inspiration";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import ProductSection from "./components/ProductSection";
import "./App.css";

const mainCategories = [
  { id: "all", name: "All Products" },
  { id: "paints", name: "Paints" },
  { id: "distemper", name: "Distemper" },
  { id: "pu-polish", name: "PU Polish" },
  { id: "wood-polish", name: "Wood Polish" },
  { id: "tools", name: "Paint Brush and Rollers" },
  { id: "enamel", name: "Enamel" },
  { id: "putty-primers", name: "Putty & Primers" },
];

const subCategories = {
  paints: ["interior", "exterior", "emulsion", "textured"],
  distemper: ["acrylic", "synthetic", "water-based"],
  "pu-polish": ["glossy", "matte", "water-based"],
  "wood-polish": ["melamine", "nc", "french", "water-based"],
  tools: ["flat", "round", "foam", "textured"],
  enamel: ["synthetic", "water-based", "high-gloss", "satin"],
  "putty-primers": ["wall-putty", "acrylic-putty", "cement-putty", "oil-primer", "water-primer"],
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
        setUser(null);
      }
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page with Full Sections */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <main className="App-main">
                  <ProductSection mainCategories={mainCategories} subCategories={subCategories} />
                  <Services />
                  <OurProcess />
                  <Inspiration />
                  <Testimonials />
                  <ContactUs />
                </main>
                <Footer />
              </>
            }
          />

          {/* Products Page */}
          <Route
            path="/products"
            element={<AllProducts mainCategories={mainCategories} subCategories={subCategories} />}
          />

          {/* Gallery Page */}
          <Route path="/gallery" element={<Gallery />} />

          {/* Authentication Page */}
          <Route path="/auth" element={<Auth setUser={setUser} />} />

          {/* Admin Dashboard (Restricted Access) */}
          <Route
            path="/admin"
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/auth" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
