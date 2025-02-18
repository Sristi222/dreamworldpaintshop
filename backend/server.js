const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const fs = require("fs");


const app = express();
app.use(express.json());
app.use(cors());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// **Connect to MongoDB**
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// **Multer Storage Setup for Image Upload**
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// **User Schema**
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true }
});
const User = mongoose.model("User", UserSchema);

// **Product Schema**
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  description: { type: String },
  imageUrl: { type: String }, // Store Image Path
});

const Product = mongoose.model("Product", ProductSchema);

// **Middleware to verify admin**
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "❌ Access Denied. No token provided." });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "❌ Invalid or Expired Token" });
  }
};

// **Admin Registration**
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "❌ User already exists. Please login." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "✅ Admin Registered. Please login." });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

// **Admin Login**
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "❌ User not found. Please register first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "❌ Incorrect password. Try again." });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.json({ token, user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

// **Add Product (Admin Only, Supports Image Upload)**
app.post("/api/products", verifyToken, upload.single("image"), async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "❌ Unauthorized. Admin access required." });

    const { name, price, category, subCategory, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "⚠️ All required fields must be filled" });
    }

    const newProduct = new Product({ name, price, category, subCategory, description, imageUrl });
    await newProduct.save();

    res.status(201).json({ message: "✅ Product added successfully", product: newProduct });
  } catch (error) {
    console.error("❌ Error Adding Product:", error);
    res.status(500).json({ message: "❌ Error adding product" });
  }
});

// **Fetch All Products (For Website)**
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("❌ Error Fetching Products:", error);
    res.status(500).json({ message: "❌ Error fetching products" });
  }
});

// **Edit Product (Admin Only)**
app.put("/api/products/:id", verifyToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "❌ Unauthorized. Admin access required." });

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.error("❌ Error Updating Product:", error);
    res.status(500).json({ message: "❌ Error updating product" });
  }
});

// **Delete Product (Admin Only)**
app.delete("/api/products/:id", verifyToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: "❌ Unauthorized. Admin access required." });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Product deleted successfully." });
  } catch (error) {
    console.error("❌ Error Deleting Product:", error);
    res.status(500).json({ message: "❌ Error deleting product" });
  }
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
