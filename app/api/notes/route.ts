import { NextResponse } from "next/server";

let notes = [
    { id: "1", title: " What is an API?", content: "An API (Application Programming Interface) allows software to communicate. It enables applications to fetch or send data. RESTful APIs use HTTP methods like GET, POST, PUT, and DELETE. Learning APIs is useful for web and mobile development.", createdAt: new Date().toISOString() },
    { id: "2", title: "Importance of Cloud Computing", content: "Cloud computing stores and processes data online instead of on local computers. Popular services include AWS, Google Cloud, and Microsoft Azure. It allows businesses to scale applications easily and access data from anywhere.", createdAt: new Date().toISOString() },
];

//  (Fetch all notes)
export async function GET() {
    return NextResponse.json(notes);
}

//  (Add a new note)
export async function POST(req: Request) {
    const { title, content } = await req.json();

    if (!title || !content) {
        return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const newNote = {
        id: (notes.length + 1).toString(),
        title,
        content,
        createdAt: new Date().toISOString(),
    };

    notes.push(newNote);
    return NextResponse.json(newNote, { status: 201 });
}

//(Edit an existing note)
export async function PUT(req: Request) {
    const { id, title, content } = await req.json();

    if (!id || !title || !content) {
        return NextResponse.json({ error: "ID, title, and content are required" }, { status: 400 });
    }

    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    notes[noteIndex] = { ...notes[noteIndex], title, content };
    return NextResponse.json(notes[noteIndex]);
}

// (Delete a note)
export async function DELETE(req: Request) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    notes = notes.filter((note) => note.id !== id);
    return NextResponse.json({ message: "Note deleted successfully" });
}
