"use client";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5"; 
export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
      <IoArrowBack size={20} />
      Back
    </button>
  );
}