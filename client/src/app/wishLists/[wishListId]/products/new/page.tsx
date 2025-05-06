"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useParams } from "next/navigation";
interface Product {
  id: number;
  name: string;
  createdBy: string;
  price: number;
}

interface FormData {
  name: string;
  createdBy: string;
  price: number;
}

export default function NewProductForm() {
  const params = useParams();
  const { wishListId } = params as { wishListId: string }; // Extracting the id from the URL parameters
  const router = useRouter();
  const { register, handleSubmit,  reset } = useForm<FormData>({});


  const onSubmit = async (data: FormData) => {
    const formattedData = { ...data };
    console.log("Form Submitted:", formattedData);
    await api.post(
      `/wishLists/${wishListId}/products/new`,
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
      <h2 className="text-3xl font-bold text-gray-800">Create New Product</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price:
        </label>
        <input
          type="text"
          {...register("price", { required: true })}
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

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition duration-200"
        >
          Submit Product
        </button>
      </div>
    </form>
  );
}
