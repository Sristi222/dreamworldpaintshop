import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added React Router navigation
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState("allProducts"); // State to switch views
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "paints",
    subCategory: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate(); // ✅ Hook for navigation
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  // **Fetch Products**
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  // **Handle Input Change**
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // **Handle Image Upload**
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, image: file });
  };

  // **Add Product**
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("subCategory", newProduct.subCategory);
    formData.append("description", newProduct.description);
    formData.append("image", newProduct.image);

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product added successfully!");
      setNewProduct({ name: "", price: "", category: "paints", subCategory: "", description: "", image: null });
      fetchProducts();
      setActiveSection("allProducts"); // Switch to product list after adding
    } catch (error) {
      console.error("❌ Error adding product:", error);
    }
  };

  // **Delete Product**
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("❌ Error deleting product:", error);
    }
  };

  // **Sign Out Function**
  const handleSignOut = () => {
    localStorage.removeItem("token"); // ✅ Remove auth token
    alert("✅ You have been signed out.");
    navigate("/"); // ✅ Redirect admin to main website
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveSection("dashboard")}>
            <a href="#">Dashboard</a>
          </li>
          <li onClick={() => setActiveSection("allProducts")}>
            <a href="#">All Products</a>
          </li>
          <li onClick={() => setActiveSection("addProduct")}>
            <a href="#">Add Product</a>
          </li>
        </ul>

        {/* ✅ Sign Out Button */}
        <button className="signout-btn" onClick={handleSignOut}>🚪 Sign Out</button>
      </div>

      {/* Main Content */}
      <div className="content">
        <h1>🛒 Admin Dashboard</h1>

        {/* Conditional Rendering Based on Active Section */}
        {activeSection === "addProduct" && (
          <div className="add-product">
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct} className="product-form">
              <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="Product Name" required />
              <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" required />

              {/* Category Selection */}
              <select name="category" value={newProduct.category} onChange={handleChange}>
                <option value="paints">Paints</option>
                <option value="distemper">Distemper</option>
                <option value="pu-polish">PU Polish</option>
                <option value="wood-polish">Wood Polish</option>
                <option value="tools">Paint Brush and Rollers</option>
                <option value="enamel">Enamel</option>
                <option value="putty-primers">Putty & Primers</option>
              </select>

              {/* Subcategory Selection */}
              <input type="text" name="subCategory" value={newProduct.subCategory} onChange={handleChange} placeholder="Subcategory (optional)" />

              {/* Description Field */}
              <textarea name="description" value={newProduct.description} onChange={handleChange} placeholder="Product Description" required />

              {/* Image Upload */}
              <input type="file" name="image" accept="image/*" onChange={handleImageUpload} required />

              <button type="submit" className="add-product-btn">Add Product</button>
            </form>
          </div>
        )}

        {activeSection === "allProducts" && (
          <>
            <h2>📦 Products</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} className="product-img" />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>8 hours ago</td>
                      <td><span className="status-active">Active</span></td>
                      <td className="action-icons">
                        <button className="delete-btn" onClick={() => handleDelete(product._id)}>🗑️</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7">No products available.</td></tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
