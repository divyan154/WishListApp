"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  createdBy: string;
  price: number;
}

interface FormData {
  name: string;
  createdBy: string;
  products: number[];
  members: { name: string }[];
}

export default function EditWishlistForm() {
  const router = useRouter();
  const params = useParams();
  const { wishListId } = params as { wishListId: string };

  const { register, handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      members: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
      console.log("Fetched products:", response.data);
    }

    fetchProducts();
  }, []);

  const onSubmit = async (data: FormData) => {
    const formattedData = { ...data };
    console.log("Form Submitted:", formattedData);
    await axios.patch(
      `http://localhost:3001/wishLists/${wishListId}/edit`,
      formattedData
    );
    reset();
    router.push(`/wishLists/${wishListId}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-md space-y-8"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Edit Wishlist
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Wishlist Name
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Created By
        </label>
        <input
          type="text"
          {...register("createdBy", { required: true })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          Select Products
        </label>
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <label
              key={product.id}
              className="flex items-start gap-3 p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition"
            >
              <input
                type="checkbox"
                value={product.id}
                {...register("products")}
                className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="text-gray-900 font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">
                  Created By: {product.createdBy}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  Price: ₹{product.price}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Members
        </label>
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3">
              <input
                {...register(`members.${index}.name` as const)}
                placeholder="Member name"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => append({ name: "" })}
          className="mt-3 text-blue-600 hover:underline font-medium"
        >
          + Add another member
        </button>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition duration-200"
        >
          Submit Wishlist
        </button>
      </div>
    </form>
  );
}
