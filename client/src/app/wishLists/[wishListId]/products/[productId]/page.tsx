"use client";
import React, { use } from "react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
export default function ViewProduct() {
  const params = useParams();
  const { wishListId, productId } = params as {
    wishListId: string;
    productId: string;
  }; // Extracting the id from the URL parameters
  console.log("WishListId in products page ", wishListId);
  console.log("ProductId in product page", productId);
  const Router = useRouter();
  const product = {
    name: "Wireless Headphones",
    createdBy: "John Doe",
    price: 199.99,
    addedAt: "2025-05-01",
  };
  const [productName, setProductName] = useState("");
  const [productCreatedBy, setProductCreatedBy] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productAddedAt, setProductAddedAt] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(
          `/wishLists/wishListId/products/${productId}`
        );
        const { data } = response;
        console.log("Fetched product:", data);
        setProductName(data.name);
        setProductCreatedBy(data.createdBy);
        setProductPrice(data.price);
        setProductAddedAt(data.addedAt);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-[350px] bg-blue shadow-lg border border-gray-200 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Product Details
        </h2>

        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">{productName}</p>
          <p className="text-sm text-gray-500 mt-1">
            Created By: {productCreatedBy}
          </p>
          <p className="text-md text-blue-600 font-medium mt-3">
            Price: ${productPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Added On: {new Date(productAddedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              Router.push(
                `/wishLists/${wishListId}/products/${productId}/edit`
              );
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Edit Product
          </button>

          <button
            onClick={() => {
              api.delete(
                `/wishLists/${wishListId}/products/${productId}`
              );
              Router.push(`/wishLists/${wishListId}`);
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Delete Product
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          Router.push(`/wishLists/${wishListId}`);
        }}
        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Back to WishList
      </button>
    </div>
  );
}
