dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
import dotenv from "dotenv";

import Product from "./models/Product.js";
import WishList from "./models/WishList.js";

import User from "./models/User.js";
// firebase imports

import authenticateUser from "./middleware.js";

app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://wish-list-app-uw6w.vercel.app",
  "https://wish-list-app-gamma.vercel.app",
  "https://wish-list-pgxsrkc45-divyan154s-projects.vercel.app",
];
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};
app.use(cors(corsOptions));




app.get("/api", (req, res) => {
  res.send("Hello from the API!");
});

app.use(['/register', '/login', '/wishLists', '/products'], authenticateUser);


const Db_Url = process.env.MONGODB_URL || "mongodb://localhost:27017/yelp-camp";

if (!Db_Url) {
  console.error("❌ MONGODB_URL not found in environment variables.");
  process.exit(1);
}

mongoose
  .connect(Db_Url)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/register", async (req, res) => {
  console.log("Request to register received nowww!!!!");

  const { name } = req.body;
  const { firebaseUid, email } = req.user; // ✅ Comes from middleware

  try {
    let user = await User.findOne({ firebaseUid });
    if (!user) {
      user = new User({ name, email, firebaseUid });
      await user.save();
    }

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Registration failed:", err);
    res
      .status(500)
      .json({ message: "Failed to register user", error: err.message });
  }
});
// route.js or wherever you define routes

app.post("/login", async (req, res) => {
  console.log("Request to login received");
  try {
    const { firebaseUid } = req.user;

    // 🔍 Check if user exists in MongoDB
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }

    // ✅ Return user info or any token if you issue custom ones
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login failed:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

app.get("/wishLists", async (req, res) => {
  console.log("User id in backend in get wishLists route : ", req.user);
  const WishLists = await WishList.find();

  res.send(WishLists);
});

app.get("/wishLists/:wishListId/view", async (req, res) => {
  const { wishListId } = req.params;
 
  const wishList = await WishList.findById(wishListId)
    .populate({
      path: "products",
      populate: {
        path: "createdBy",
        model: "User",
        select: "name-_id", // ✅ Only populate the user's name
      },
    })
    .populate({
      path: "createdBy",
      select: "name -_id", // Only include the name field
    });
  console.log("WishList found:", wishList);
  if (!wishList) {
    return res.status(404).json({ message: "WishList not found" });
  }
  res.status(200).json(wishList);
});
app.get("/products", async (req, res) => {
  const response = await Product.find({}).populate("createdBy");
  // console.log("Products found:", response);
  if (!response) {
    return res.status(404).json({ message: "Products not found" });
  }
  res.status(200).json(response);
});
app.post("/wishLists/new", async (req, res) => {
  const { name, createdBy, members: memberNames, products } = req.body;
  const { firebaseUid } = req.user;
  
  const productIds = products;
  const members = memberNames.map((n) => ({ name: n.name }));
  const user = await User.findOne({ firebaseUid });
  const userId = user._id;
  const newWishList = new WishList({
    name,
    createdBy: userId,
    members,
    products: productIds,
  });
  await newWishList.save();
  res.status(201).json(newWishList);
});

app.get("/wishLists/:wishListId/products", async (req, res) => {
  const wishListId = req.params.wishListId;
  const wishList = await WishList.findById(wishListId).populate("products");
 
  const products = wishList.products;
  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }
  res.status(200).json(products);
});
app.patch("/wishLists/:wishListId/edit", async (req, res) => {
  const { wishListId } = req.params;
  const { name, createdBy, members: memberNames, products } = req.body;
  const { firebaseUid } = req.user;
  const user = await User.findOne({ firebaseUid });
  const userId = user._id;
  const members = memberNames.map((n) => ({ name: n.name }));
  const newWishList = await WishList.findByIdAndUpdate(wishListId, {
    name,
    createdBy: userId,
    members,
    products,
  })
    .populate("products")
    .populate({ path: "createdBy", select: "name -_id" });
  console.log("NewLy updated WishList", newWishList);
 
  if (!newWishList) {
    return res.status(404).json({ message: "WishList not found" });
  }
  res.status(200).json({ message: "WishList Successfully updated" });
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
  const { firebaseUid } = req.user;
  const user = await User.findOne({ firebaseUid });
  const userId = user._id;
  const newProduct = new Product({
    name,
    price,
    createdBy: userId,
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
    const firebaseUid = req.user.firebaseUid;
    const user = await User.findOne({ firebaseUid });
    const userId = user._id;
    if (!wishList) {
      return res.status(404).json({ message: "WishList not found" });
    }
    const newProduct = await Product.findByIdAndUpdate(productId, {
      name,
      price,
      createdBy: userId,
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


