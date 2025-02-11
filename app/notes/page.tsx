"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa"; 
import toast, { Toaster } from "react-hot-toast"; 
import BackButton from "../components/backButton"; 

interface Note {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editingNote, setEditingNote] = useState<Note | null>(null); 
    const [newTitle, setNewTitle] = useState<string>("");
    const [newContent, setNewContent] = useState<string>("");
    const router = useRouter();

    const colors = ["#E5D9F2", "#F5EFFF", "#CDC1FF", "#A594F9"]; 

    useEffect(() => {
        async function fetchNotes() {
            const res = await fetch("/api/notes");
            const data = await res.json();
            setNotes(data);
        }
        fetchNotes();
    }, []);

    async function deleteNote(id: string) {
        const res = await fetch("/api/notes", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            setNotes(notes.filter((note) => note.id !== id));
            toast.success("✅ Note deleted successfully!", {
                className: "bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg",
            });
        } else {
            toast.error("❌ Failed to delete note!", {
                className: "bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg",
            });
        }
    }

    async function updateNote(id: string, updatedTitle: string, updatedContent: string) {
        const res = await fetch("/api/notes", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, title: updatedTitle, content: updatedContent }),
        });

        if (res.ok) {
            const updatedNote = await res.json();
            setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
            setEditingNote(null);
            toast.success("✏️ Note updated successfully!", {
                className: "bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg",
            });
        } else {
            toast.error("⚠️ Failed to update note!", {
                className: "bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg",
            });
        }
    }

    const handleEdit = (note: Note) => {
        setEditingNote(note);
        setNewTitle(note.title);
        setNewContent(note.content);
    };

    return (
    <div className="max-w-5xl w-full p-6">
        <Toaster /> 

        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r  via-pink-500 from-blue-500 to-purple-500 text-transparent bg-clip-text">
             My All Notes
            </h1>
        <div className="absolute top-0 left-28 pt-8"><BackButton /></div>
        

        <div className="space-y-6"> 
            {notes.map((note, index) => (
                <div
                    key={note.id}
                    className="shadow-lg rounded-lg p-5 ml-20 transition transform hover:scale-105 w-full"
                    style={{
                        backgroundColor: colors[index % colors.length],
                        color: index % colors.length === 3 ? "#FFFFFF" : "#333333",
                    }}
                >
                    {editingNote?.id === note.id ? (
                        <div>
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full mb-2 p-2 border rounded text-gray-800"
                            />
                            <textarea
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                className="w-full mb-2 p-2 border rounded text-gray-800"
                            />
                            <div className="flex justify-between">
                                <button
                                    onClick={() => updateNote(note.id, newTitle, newContent)}
                                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    <FaSave /> Save
                                </button>
                                <button
                                    onClick={() => setEditingNote(null)}
                                    className="flex items-center gap-2 bg-gray-500 text-white px-3 py-1 rounded"
                                >
                                    <FaTimes /> Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                            <p>{note.content}</p>
                            <p className="text-gray-400 text-sm mt-1">
                                Created on: {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                            <div className="mt-3 flex justify-end gap-3"> 
                                <button
                                    onClick={() => handleEdit(note)}
                                    className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => deleteNote(note.id)}
                                    className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            ))}
        </div>
    </div>


        
    );
}
