// components/Navbar.js
"use client";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase"; // 🔹 your Firebase config file
export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    
    try {
      await signOut(auth);
      localStorage.removeItem("token"); // if you're storing Firebase ID token
      router.push("/login");
    } catch (err: any) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <nav className="p-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">WishApp</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </nav>
  );
}
