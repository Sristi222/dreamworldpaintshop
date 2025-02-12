"use client"

import { useState, useEffect } from "react"
import "./ProductSection.css"

const ProductSection = () => {
  const [currentMainCategory, setCurrentMainCategory] = useState("all")
  const [currentSubCategory, setCurrentSubCategory] = useState(null)
  const [modalProduct, setModalProduct] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        {
          id: "int3",
          title: "Matte Finish Interior Paint",
          description: "Elegant matte finish for interior walls",
          price: "Rs. 500",
          image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&w=300&q=80",
          details: "Rich color depth, hides imperfections, and easy to touch up.",
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
        {
          id: "ext3",
          title: "High-Gloss Exterior Paint",
          description: "Shiny, reflective exterior paint",
          price: "Rs. 800",
          image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=300&q=80",
          details: "Excellent for trim and accents, highly durable, and easy to clean.",
        },
      ],
      emulsion: [
        {
          id: "emu1",
          title: "Premium Emulsion Paint",
          description: "High-quality water-based emulsion",
          price: "Rs. 600",
          image: "https://images.unsplash.com/photo-1572969057162-d3b40b2d3971?auto=format&fit=crop&w=300&q=80",
          details: "Excellent coverage, quick-drying, and low odor.",
        },
        {
          id: "emu2",
          title: "Silk Emulsion Paint",
          description: "Smooth, silky finish emulsion",
          price: "Rs. 700",
          image: "https://images.unsplash.com/photo-1559554704-0f74b35a0f94?auto=format&fit=crop&w=300&q=80",
          details: "Luxurious sheen, highly washable, and stain-resistant.",
        },
      ],
      textured: [
        {
          id: "tex1",
          title: "Stone Texture Paint",
          description: "Paint with stone-like texture",
          price: "Rs. 850",
          image: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&w=300&q=80",
          details: "Creates a natural stone look, highly durable, and weather-resistant.",
        },
        {
          id: "tex2",
          title: "Sandstone Finish Paint",
          description: "Sandstone textured wall paint",
          price: "Rs. 900",
          image: "https://images.unsplash.com/photo-1617850687395-620757feb1f3?auto=format&fit=crop&w=300&q=80",
          details: "Elegant sandstone appearance, masks wall imperfections, and long-lasting.",
        },
      ],
    },
    // ... (other product categories)
  }

  const getFilteredProducts = () => {
    if (currentMainCategory === "all") {
      return Object.values(products).flatMap((category) => Object.values(category).flat())
    }
    if (currentSubCategory) {
      return products[currentMainCategory]?.[currentSubCategory] || []
    }
    return Object.values(products[currentMainCategory] || {}).flat()
  }

  const handleMainCategoryClick = (category) => {
    setCurrentMainCategory(category)
    setCurrentSubCategory(null)
  }

  const handleSubCategoryClick = (subCategory) => {
    setCurrentSubCategory(subCategory)
  }

  const openModal = (product) => {
    setModalProduct(product);
    setTimeout(() => {
      setIsModalVisible(true);
    }, 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setModalProduct(null);
    }, 300);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }

    if (modalProduct) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleEscape)
    } else {
      document.body.style.overflow = "visible"
    }

    return () => {
      document.body.style.overflow = "visible"
      document.removeEventListener("keydown", handleEscape)
    }
  }, [modalProduct, closeModal])

  return (
    <section className="products">
      <div className="container">
        <h2 className="section-title">Our Product Range</h2>

        <div className="filter-options main-filter">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              className={`filter-button ${currentMainCategory === category.id ? "active" : ""}`}
              onClick={() => handleMainCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {currentMainCategory !== "all" && subCategories[currentMainCategory] && (
          <div className="filter-options sub-filter">
            <div className="sub-categories">
              {subCategories[currentMainCategory].map((subCategory) => (
                <button
                  key={subCategory}
                  className={`filter-button ${currentSubCategory === subCategory ? "active" : ""}`}
                  onClick={() => handleSubCategoryClick(subCategory)}
                >
                  {subCategory
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="products-grid">
          {getFilteredProducts().map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-image" />
                <button className="view-btn" onClick={() => openModal(product)}>
                  Quick View
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          <a href="/products" className="view-all-btn">
            View All Products
          </a>
        </div>
      </div>

      {modalProduct && (
        <div className={`modal ${isModalVisible ? 'show' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={modalProduct.image || "/placeholder.svg"} alt={modalProduct.title} className="modal-image" />
            <h2 className="product-title">{modalProduct.title}</h2>
            <p className="product-description">{modalProduct.description}</p>
            <p className="product-price">{modalProduct.price}</p>
            <div className="product-details">{modalProduct.details}</div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductSection
