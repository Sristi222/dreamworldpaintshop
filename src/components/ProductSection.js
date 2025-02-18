"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./ProductSection.css"

const ProductSection = ({ products, mainCategories, subCategories }) => {
  const [currentMainCategory, setCurrentMainCategory] = useState("all")
  const [currentSubCategory, setCurrentSubCategory] = useState(null)
  const [modalProduct, setModalProduct] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false) // Added state for modal visibility

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
    setModalProduct(product)
    setIsModalVisible(true) // Show modal when opening
  }

  const closeModal = () => {
    setModalProduct(null)
    setIsModalVisible(false) // Hide modal when closing
  }

  const filteredProducts = getFilteredProducts().slice(0, 3) // Display only 6 products

  return (
    <section className="products">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>

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
          {filteredProducts.map((product) => (
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
          <Link to="/products" className="view-all-btn">
            View All Products
          </Link>
        </div>
      </div>

      {modalProduct && (
        <div className={`modal ${isModalVisible ? "show" : ""}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={modalProduct.image || "/placeholder.svg"} alt={modalProduct.title} className="modal-image" />
            <h2 className="modal-product-title">{modalProduct.title}</h2>
            <p className="modal-product-description">{modalProduct.description}</p>
            <p className="modal-product-price">{modalProduct.price}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductSection

