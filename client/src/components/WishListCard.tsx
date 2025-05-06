import React from "react";
import Link from "next/link";
import moment from "moment";

interface Product {
  id: number;
  name: string;
}
interface Member {
  name: string;
}
interface WishListCardProps {
  id: string;
  name: string;
  products?: Product[];
  members?: Member[];
  createdAt?: string;
  createdBy?: string;
}

export default function WishListCard({
  id,
  name,
  members = [],
  createdAt,
  
}: WishListCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col justify-between space-y-6 w-full max-w-sm transition hover:shadow-lg">
      {/* Wishlist Title and CreatedAt */}
      <div className="text-center space-y-1">
        <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">
          {createdAt ? moment(createdAt).format("ddd - hA") : ""}
        </p>
      </div>

      {/* Members */}
      <div className="text-center">
        <p className="text-sm text-gray-700 font-medium">
          Members:{" "}
          <span className="font-normal">
            {members.length > 0
              ? members.map((m) => m.name).join(", ")
              : "No members"}
          </span>
        </p>
      </div>

      {/* View Button */}
      <div className="flex justify-center">
        <Link
          href={`/wishLists/${id}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
        >
          View Wishlist
        </Link>
      </div>
    </div>
  );
}
