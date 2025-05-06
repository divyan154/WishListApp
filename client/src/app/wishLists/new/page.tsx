"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface Product {
  _id: number;
  name: string;
  createdBy: {
    name: string;
  };
  price: number;
}

interface FormData {
  name: string;
  createdBy: string;
  products: number[];
  members: { name: string }[];
}

export default function WishlistForm() {
  const router = useRouter();
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
      const response = await api.get("/products");
      setProducts(response.data);
      console.log("Fetched products:", response.data);
    }

    fetchProducts();
  }, []);

  const onSubmit = async (data: FormData) => {
    const formattedData = { ...data };
    console.log("Form Submitted:", formattedData);
    await api.post("/wishLists/new", formattedData);
    reset();
    router.push("/wishLists");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-10 bg-white rounded-3xl shadow-lg space-y-10"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Create New Wishlist
        </h2>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">
            Wishlist Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">
            Created By
          </label>
          <input
            type="text"
            {...register("createdBy", { required: true })}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-2xl font-semibold text-gray-800 mb-4 text-center">
            Select Products
          </label>
          <div className="grid md:grid-cols-2 gap-5">
            {products.map((product) => (
              <label
                key={product._id}
                className="flex items-start gap-4 p-5 border rounded-2xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer shadow-sm"
              >
                <input
                  type="checkbox"
                  value={product._id}
                  {...register("products")}
                  className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <p className="text-lg text-gray-900 font-semibold">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created By: {product.createdBy.name}
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
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Members
          </label>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <input
                  {...register(`members.${index}.name` as const)}
                  placeholder="Member name"
                  className="flex-1 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="mt-4 text-blue-600 hover:underline font-medium"
          >
            + Add another member
          </button>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-xl font-semibold px-6 py-4 rounded-2xl shadow-md hover:bg-blue-700 transition duration-200"
          >
            Submit Wishlist
          </button>
        </div>
      </form>
    </div>
  );
}
