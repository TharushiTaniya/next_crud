"use client"; // Highlighted in Pale Yellow
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa"; // Import plus icon
import BackButton from "../../components/backButton"; // Import BackButton component

export default function AddNotePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "error" or "success"
    const router = useRouter();

    async function addNote() {
        if (!title || !content) {
            setMessageType("error");
            setMessage("Both title and content are required.");
            return;
        }

        const res = await fetch("/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            setMessageType("success");
            setMessage("Note added successfully.");
            setTitle("");
            setContent("");
            
            setTimeout(() => {
                router.push("/notes"); // Redirect to View Notes Page
            }, 2000);
        } else {
            setMessageType("error");
            setMessage("Failed to add note.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5]">
            <div className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-2xl">
                <BackButton />

                <h1 className="text-3xl font-bold mb-6 text-center text-[#6C9BCF]">
                    Add New Note
                </h1>

                {message && (
                    <div className={`mb-4 p-3 text-white text-center rounded ${messageType === "error" ? "bg-red-500" : "bg-green-500"}`}>
                        {message}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-[#CCCCCC] text-[#333333] rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#6C9BCF]"
                />
                
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 border border-[#CCCCCC] text-[#333333] rounded-lg mb-4 h-40 focus:outline-none focus:ring-2 focus:ring-[#6C9BCF]"
                />
                
                <button
                    onClick={addNote}
                    className="w-full flex items-center justify-center gap-2 bg-[#6C9BCF] text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-[#5A89C1] transition"
                >
                    <FaPlus /> Add Note
                </button>
            </div>
        </div>
    );
}
