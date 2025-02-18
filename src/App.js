import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import ProductSection from "./components/ProductSection"
import Services from "./components/Services"
import OurProcess from "./components/OurProcess"
import Inspiration from "./components/Inspiration"
import ContactUs from "./components/ContactUs"
import AllProducts from "./Pages/AllProducts"
import Testimonials from "./components/Testimonials"
import Footer from "./components/Footer"
import Gallery from "./Pages/Gallery" // Import the Gallery component
import "./App.css"

const products = {
  paints: {
    interior: [
      {
        id: "int1",
        title: "Premium Interior Paint",
        description: "High-quality interior wall paint",
        price: "Rs. 450",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&q=80",
        details: "Smooth finish, easy to clean, and long-lasting color.",
      },
      {
        id: "int2",
        title: "Eco-Friendly Interior Paint",
        description: "Low-VOC interior wall paint",
        price: "Rs. 550",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80",
        details: "Environmentally friendly, excellent coverage, and durable finish.",
      },
    ],
    exterior: [
      {
        id: "ext1",
        title: "Weather Shield Exterior Paint",
        description: "Weather-resistant exterior paint",
        price: "Rs. 650",
        image: "https://images.unsplash.com/photo-1595185584650-e1b2b91f284b?auto=format&fit=crop&w=300&q=80",
        details: "Protects against harsh weather conditions, UV-resistant, and long-lasting color.",
      },
      {
        id: "ext2",
        title: "Textured Exterior Paint",
        description: "Textured finish for exterior walls",
        price: "Rs. 750",
        image: "https://images.unsplash.com/photo-1604148482093-d55d6fc62400?auto=format&fit=crop&w=300&q=80",
        details: "Hides surface imperfections, water-resistant, and durable.",
      },
    ],
  },
  distemper: {
    acrylic: [
      {
        id: "dis1",
        title: "Acrylic Distemper",
        description: "Water-based acrylic distemper",
        price: "Rs. 300",
        image: "https://images.unsplash.com/photo-1562184760-a11b3cf7c169?auto=format&fit=crop&w=300&q=80",
        details: "Economical, good coverage, and easy to apply.",
      },
    ],
    synthetic: [
      {
        id: "dis2",
        title: "Synthetic Distemper",
        description: "Oil-based synthetic distemper",
        price: "Rs. 350",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80",
        details: "Durable finish, suitable for high-traffic areas.",
      },
    ],
  },
}

const mainCategories = [
  { id: "all", name: "All Products" },
  { id: "paints", name: "Paints" },
  { id: "distemper", name: "Distemper" },
  { id: "pu-polish", name: "PU Polish" },
  { id: "wood-polish", name: "Wood Polish" },
  { id: "tools", name: "Paint Brush and Rollers" },
  { id: "enamel", name: "Enamel" },
  { id: "putty-primers", name: "Putty & Primers" },
]

const subCategories = {
  paints: ["interior", "exterior", "emulsion", "textured"],
  distemper: ["acrylic", "synthetic", "water-based"],
  "pu-polish": ["glossy", "matte", "water-based"],
  "wood-polish": ["melamine", "nc", "french", "water-based"],
  tools: ["flat", "round", "foam", "textured"],
  enamel: ["synthetic", "water-based", "high-gloss", "satin"],
  "putty-primers": ["wall-putty", "acrylic-putty", "cement-putty", "oil-primer", "water-primer"],
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <main className="App-main">
                  <ProductSection products={products} mainCategories={mainCategories} subCategories={subCategories} />
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
          <Route
            path="/products"
            element={<AllProducts products={products} mainCategories={mainCategories} subCategories={subCategories} />}
          />
          <Route path="/gallery" element={<Gallery />} /> {/* Add the Gallery route */}
        </Routes>
      </div>
    </Router>
  )
}

export default App

