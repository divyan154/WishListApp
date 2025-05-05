import mongoose from "mongoose";
import Product from "../models/Product.js"; // Assuming you have a Product model defined
mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
  const products = [
    { id: 1, name: "Product 1", createdBy: "Daniel Lee", price: 29.99 },
    { id: 2, name: "Product 2", createdBy: "Chloe Kim", price: 17.49 },
    { id: 3, name: "Product 3", createdBy: "Mason Brooks", price: 8.99 },
    { id: 4, name: "Product 4", createdBy: "Ella Rivera", price: 43.75 },
    { id: 5, name: "Product 5", createdBy: "Logan Diaz", price: 12.50 },
    { id: 6, name: "Product 6", createdBy: "Zoe Walker", price: 36.10 },
    { id: 7, name: "Product 7", createdBy: "Nathan Cox", price: 9.99 },
    { id: 8, name: "Product 8", createdBy: "Isla Ross", price: 24.00 },
    { id: 9, name: "Product 9", createdBy: "Ryan Evans", price: 6.25 },
    { id: 10, name: "Product 10", createdBy: "Lily Wood", price: 19.95 },
    { id: 11, name: "Product 11", createdBy: "Owen Baker", price: 27.89 },
    { id: 12, name: "Product 12", createdBy: "Sienna Reid", price: 14.40 },
    { id: 13, name: "Product 13", createdBy: "Elijah Grant", price: 11.75 },
    { id: 14, name: "Product 14", createdBy: "Nora Lane", price: 22.35 },
    { id: 15, name: "Product 15", createdBy: "Henry Adams", price: 31.80 },
    { id: 16, name: "Product 16", createdBy: "Ruby Shaw", price: 7.99 },
  ];
  

const addProducts = async () => {
  const result = await Product.insertMany(products);
  console.log("Products added:", result);
};
// addProducts();

export default products;
