import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

import Product from "./models/Product.js";
import WishList from "./models/WishList.js";
import products from "./seeds/products.js";
// import User from "./models/User.js";

app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/wishLists/:userId", async (req, res) => {
  const WishLists = await WishList.find();

  res.send(WishLists);
});

app.get("/wishLists/:wishListId/view", async (req, res) => {
  const { wishListId } = req.params;
  // console.log("WishList id in backend: ", wishListId);
  const wishList = await WishList.findById(wishListId).populate("products");
  // console.log("WishList found:", wishList);
  if (!wishList) {
    return res.status(404).json({ message: "WishList not found" });
  }
  res.status(200).json(wishList);
});
app.get("/products", async (req, res) => {
  const response = await Product.find({});
  // console.log("Products found:", response);
  if (!response) {
    return res.status(404).json({ message: "Products not found" });
  }
  res.status(200).json(response);
});
app.post("/wishLists/new/:userId", async (req, res) => {
  const { name, createdBy, members: memberNames, products } = req.body;
  // console.log("Request body in new WishList", req.body);
  // Get ObjectIds of products by name
  const productIds = products;
  const members = memberNames.map((n) => ({ name: n.name }));

  const newWishList = new WishList({
    name,
    createdBy,
    members,
    products: productIds,
  });

  await newWishList.save();

  res.status(201).json(newWishList);
});

app.get("/wishLists/:wishListId/products", async (req, res) => {
  const wishListId = req.params.wishListId;
  const wishList = await WishList.findById(wishListId).populate("products");
  // console.log("WishList found:", wishList);
  const products = wishList.products;
  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }
  res.status(200).json(products);
});
app.patch("/wishLists/:wishListId/edit", async (req, res) => {
  const { wishListId } = req.params;
  const { name, createdBy, members: memberNames, products } = req.body;
  const members = memberNames.map((n) => ({ name: n.name }));
  const newWishList = await WishList.findByIdAndUpdate(wishListId, {
    name,
    createdBy,
    members,
    products,
  }).populate("products");
  console.log("NewLy updated WishList", newWishList);
  res.status(200).json({ message: "WishList Successfully updated" });
  if (!newWishList) {
    return res.status(404).json({ message: "WishList not found" });
  }
});
app.delete("/wishLists/:wishListId", async (req, res) => {
  const { wishListId } = req.params;
  const wishList = await WishList.findByIdAndDelete(wishListId);
  console.log("WishList deleted:", wishList);
  if (!wishList) {
    return res.status(404).json({ message: "WishList not found" });
  }
  res.status(200).json("WishList deleted successfully");
});
app.get("/wishLists/:wishListId/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
  // console.log("Product found:", product);
});
app.post("/wishLists/:wishListId/products/new", async (req, res) => {
  const { wishListId } = req.params;
  const wishList = await WishList.findById(wishListId);
  if (!wishList) {
    return res.status(404).json({ message: "WishList not found" });
  }
  const { name, price, createdBy } = req.body;
  const newProduct = new Product({
    name,
    price,
    createdBy,
  });
  wishList.products.push(newProduct._id);
  await wishList.save();
  const response = await newProduct.save();
  console.log("New product created:", response);
  res.status(201).json("message: Product created successfully");
});

app.patch(
  "/wishLists/:wishListId/products/:productId/edit",
  async (req, res) => {
    const { wishListId, productId } = req.params;
    const { name, price, createdBy } = req.body;
    const wishList = await WishList.findById(wishListId);
    if (!wishList) {
      return res.status(404).json({ message: "WishList not found" });
    }
    const newProduct = await Product.findByIdAndUpdate(productId, {
      name,
      price,
      createdBy,
    });
    if (!newProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.send("Request Received");
  }
);
app.delete("/wishLists/:wishListId/products/:productId", async (req, res) => {
  const { wishListId, productId } = req.params;
  // console.log("WishList id in backend: ", wishListId);
  // console.log("Product id in backend: ", productId);
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const wishList = await WishList.findById(wishListId);
  if (!wishList) {
    return res.status(404).json({ message: "WishList not found" });
  }
  await WishList.findByIdAndUpdate(wishListId, {
    $pull: { products: productId },
  });
  res.status(200).json("Product deleted successfully");
  // console.log("Product deleted:", product);
  // console.log("WishList found:", wishList);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// */
/*

*/
