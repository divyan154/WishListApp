"use client";
import React from "react";
import moment from "moment";
import ProductCard from "../../../components/ProductCard";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
interface Product {
  _id: number;
  name: string;
  createdBy: string;
  price: number;
}
import { useRouter } from "next/navigation";

export default function WishListCard() {
  const Router = useRouter();
  const params = useParams();
  const { wishListId } = params as { id: string }; // Extracting the id from the URL parameters
  // console.log("Id in WishList View Page", params);
  const [wishListName, setWishListName] = useState("");
  const [wishListProducts, setWishListProducts] = useState<Product[]>([]);
  const [wishListMembers, setWishListMembers] = useState<{ name: string }[]>(
    []
  );
  const [wishListCreatedAt, setWishListCreatedAt] = useState<string>("");
  const [wishListCreatedBy, setWishListCreatedBy] = useState("")

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await api.get(
          `/wishLists/${wishListId}/view`
        ); // should ideally fetch wishlist for the user

        setWishListProducts(response.data.products); // assuming an array of products
        setWishListMembers(response.data.members); // assuming an array of members
        setWishListName(response.data.name);
        setWishListCreatedAt(response.data.createdAt); // assuming a string date
        setWishListCreatedBy(response.data.createdBy.name); // assuming a string name
      } catch (error) {
        console.error("Error fetching wishlists:", error);
      }
    };

    fetchWishList();
  }, [wishListId]);

  return (
    <div className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm w-full">
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{wishListName}</h2>
          <p className="text-sm text-gray-500">
            Created by: {wishListCreatedBy}
          </p>
          <p className="text-sm text-gray-500">
            Members: {wishListMembers.map((m) => m.name).join(", ")}
          </p>
          <p className="text-sm text-gray-400">
            Created at: {moment(wishListCreatedAt).format("ddd-hA")}
          </p>
        </div>

        <button
          onClick={() =>
            Router.push(`/wishLists/${wishListId}/products/new`)
          }
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          + New Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishListProducts.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            createdBy={product.createdBy?.name || "Unknown"}
            price={product.price}
            onView={() =>
              Router.push(`/wishLists/${wishListId}/products/${product._id}`)
            }
            onEdit={() =>
              Router.push(
                `/wishLists/${wishListId}/products/${product._id}/edit`
              )
            }
            onDelete={async () => {
              await api.delete(
                `/wishLists/${wishListId}/products/${product._id}`
              );
              setWishListProducts((prev) =>
                prev.filter((p) => p._id !== product._id)
              );
            }}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-end mt-4">
        <button
          onClick={() => Router.push("/wishLists")}
          className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded max-w-[200px]"
        >
          Back to WishLists
        </button>
        <button
          onClick={() => Router.push(`/wishLists/${wishListId}/edit`)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded max-w-[200px]"
        >
          Edit WishList
        </button>
        <button
          onClick={async () => {
            try {
              await api.delete(`/wishLists/${wishListId}`);
              Router.push("/wishLists");
            } catch (error) {
              console.error("Failed to delete wishlist:", error);
            }
          }}
          className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded max-w-[200px]"
        >
          Delete WishList
        </button>
      </div>
    </div>
  );
}
