// { name, createdBy, members: [userId], products: [productId], createdAt }
import mongoose from "mongoose";
const WishListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  members: [{ name: { type: String, required: true } }],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const WishList = mongoose.model("WishList", WishListSchema);
export default WishList;
