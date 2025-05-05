// { name, createdBy, members: [userId], products: [productId], createdAt }
import mongoose from "mongoose";
const WishListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  // members: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
  // products: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Product",
  //   },
  // ],
  members: [{ name: { type: String, required: true } }],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  createdBy: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const WishList = mongoose.model("WishList", WishListSchema);
export default WishList;
