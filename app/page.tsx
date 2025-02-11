"use client";

import { useRouter } from "next/navigation";
import { FaStickyNote, FaPlusCircle } from "react-icons/fa";
import Head from "next/head";
import "./globals.css";

export default function HomePage() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Notes App</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md md:max-w-lg">
                    <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-transparent bg-clip-text">
                        Notes App
                    </h1>
                    <div className="grid grid-cols-1 gap-6">
                        <div 
                            onClick={() => router.push("/notes")}
                            className="bg-red-50 shadow-md rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition"
                        >
                            <FaStickyNote className="text-blue-500 text-5xl mb-3" />
                            <h2 className="text-xl font-semibold text-gray-700">View Notes</h2>
                        </div>
                        <div 
                            onClick={() => router.push("/notes/add")}
                            className="bg-red-50 shadow-md rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition"
                        >
                            <FaPlusCircle className="text-green-500 text-5xl mb-3" />
                            <h2 className="text-xl font-semibold text-gray-700">Add Note</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}