"use client";
import React, { use } from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import api from "@/lib/api";
import Link from "next/link";
import WishListCard from "@/components/WishListCard";
interface WishList {
  _id: string;
  name: string;
  products: { id: number; name: string; imageUrl: string }[];
  members: { name: string }[];
  createdAt: string;
  createdBy: string;
}
export default function DashboardPage() {
  const [wishlists, setWishlists] = useState<WishList[]>([]);

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/wishlists/1"); // should ideally fetch all wishlists for the user
        console.log(response.data);
        setWishlists(response.data); // assuming an array of wishlists
      } catch (error) {
        console.error("Error fetching wishlists:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Headings */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome, {username || "User"}
          </h1>
          <h2 className="text-xl text-gray-600 mt-2">Your Wishlists</h2>
        </div>

        {/* Create Wishlist Button */}
        <div className="text-center">
          <Link
            href="/wishLists/new"
            className="inline-block bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            + Create New Wishlist
          </Link>
        </div>

        {/* Wishlist Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-2 sm:px-6">
          {wishlists.map((wishlist, i) => (
            <WishListCard
              key={i}
              id={wishlist._id}
              name={wishlist.name}
              products={wishlist.products}
              members={wishlist.members}
              createdAt={moment(wishlist.createdAt).format("DD-MMM-YYYY")}
              createdBy={wishlist.createdBy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
