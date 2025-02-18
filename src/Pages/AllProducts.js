"use client"

import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import "../components/ProductSection.css"
import Footer from "../components/Footer"

const AllProducts = ({ products, mainCategories, subCategories }) => {
  const [currentMainCategory, setCurrentMainCategory] = useState("all")
  const [currentSubCategory, setCurrentSubCategory] = useState(null)
  const [modalProduct, setModalProduct] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

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
    document.body.style.overflow = "hidden"
    setTimeout(() => {
      setIsModalVisible(true)
    }, 10)
  }

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    document.body.style.overflow = "visible"
    setTimeout(() => {
      setModalProduct(null)
    }, 300)
  }, [])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }

    if (isModalVisible) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isModalVisible, closeModal])

  const filteredProducts = getFilteredProducts()

  return (
    <div className="all-products-page">
      <Navbar />
      <div className="container">
        <h1 className="section">All Products</h1>

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

        <div className="back-link-container">
          <Link to="/" className="back-link">
            Back to Home
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
            <div className="modal-product-details">{modalProduct.details}</div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default AllProducts

