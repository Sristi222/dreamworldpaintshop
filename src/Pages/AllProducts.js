"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/ProductSection.css";
import Footer from "../components/Footer";

const AllProducts = ({ mainCategories = [], subCategories = {} }) => {
  const [currentMainCategory, setCurrentMainCategory] = useState("all");
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // **Fetch Products from Backend**
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Adjust if needed
        setProducts(response.data || []);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setProducts([]); // Prevents issues if request fails
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // **Filter Products Based on Selected Category**
  const getFilteredProducts = () => {
    let filtered = [...products];

    if (currentMainCategory !== "all") {
      filtered = filtered.filter((product) => product.category === currentMainCategory);
    }
    if (currentSubCategory) {
      filtered = filtered.filter((product) => product.subCategory === currentSubCategory);
    }

    return filtered;
  };

  const handleMainCategoryClick = (category) => {
    setCurrentMainCategory(category);
    setCurrentSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    setCurrentSubCategory(subCategory);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="all-products-page">
      <Navbar />
      <div className="container">
        <h1 className="section">All Products</h1>

        {/* ✅ Prevent crash by checking if `mainCategories` exists */}
        {mainCategories.length > 0 && (
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
        )}

        {/* ✅ Prevent crash by checking if `subCategories[currentMainCategory]` exists */}
        {currentMainCategory !== "all" && subCategories[currentMainCategory] && (
          <div className="filter-options sub-filter">
            <div className="sub-categories">
              {subCategories[currentMainCategory].map((subCategory) => (
                <button
                  key={subCategory}
                  className={`filter-button ${currentSubCategory === subCategory ? "active" : ""}`}
                  onClick={() => handleSubCategoryClick(subCategory)}
                >
                  {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Show Loading State */}
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : "/placeholder.svg"}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Rs. {product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available.</p> // ✅ Prevents crash when no products exist
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllProducts;
