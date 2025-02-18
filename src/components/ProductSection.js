"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "./ProductSection.css"

const ProductSection = ({ mainCategories = [], subCategories = {} }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true) // ✅ Loading state to avoid empty data issues
  const [error, setError] = useState(null) // ✅ Track errors
  const [modalProduct, setModalProduct] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  // **Fetch products from backend**
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products") // Adjust URL if needed
        setProducts(response.data.slice(0, 3) || []) // ✅ Display only first 3 products
      } catch (error) {
        console.error("❌ Error fetching products:", error)
        setError("Failed to load products. Please try again later.") // ✅ Display error message
        setProducts([]) // ✅ Prevents undefined issues
      } finally {
        setLoading(false) // ✅ Set loading to false after fetch attempt
      }
    }

    fetchProducts()
  }, [])

  const openModal = (product) => {
    setModalProduct(product)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setModalProduct(null)
    setIsModalVisible(false)
  }

  return (
    <section className="products">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>

        {/* ✅ Show Loading or Error Message */}
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="error-message">{error}</p> // ✅ Show error message if loading fails
        ) : (
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : "/placeholder.svg"}
                      alt={product.name}
                      className="product-image"
                    />
                    <button className="view-btn" onClick={() => openModal(product)}>
                      Quick View
                    </button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Rs. {product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available.</p> // ✅ Display this when no products are found
            )}
          </div>
        )}

        {/* View All Button - Redirects to All Products Page */}
        <div className="view-all-container">
          <Link to="/products" className="view-all-btn">
            View All Products
          </Link>
        </div>
      </div>

      {/* Product Quick View Modal */}
      {modalProduct && (
        <div className={`modal ${isModalVisible ? "show" : ""}`} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src={modalProduct.imageUrl ? `http://localhost:5000${modalProduct.imageUrl}` : "/placeholder.svg"}
              alt={modalProduct.name}
              className="modal-image"
            />
            <h2 className="modal-product-title">{modalProduct.name}</h2>
            <p className="modal-product-description">{modalProduct.description}</p>
            <p className="modal-product-price">Rs. {modalProduct.price}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductSection
