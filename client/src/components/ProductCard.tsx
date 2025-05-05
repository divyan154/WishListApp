import React from "react";

interface ProductCardProps {
  name: string;
  createdBy: string;
  price: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void; // <-- added view handler
}

export default function ProductCard({
  name,
  createdBy,
  price,
  onEdit,
  onDelete,
  onView,
}: ProductCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">By: {createdBy}</p>
        <p className="text-sm font-medium text-blue-600 mt-2">
          ${price.toFixed(2)}
        </p>
      </div>

      {/* Buttons Section */}
      <div className="mt-4 flex justify-between gap-2 flex-wrap">
        <button
          onClick={onView}
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={onEdit}
          className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
