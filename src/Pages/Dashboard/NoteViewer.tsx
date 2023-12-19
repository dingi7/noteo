// src/NoteViewer.tsx

import React, { useState } from "react";
import { INote } from "../../Interfaces/IItems";

interface Props {
    note: INote;
    onUpdateNote: (updatedNote: INote) => void; // Add a prop to handle note update
}

const NoteViewer: React.FC<Props> = ({ note, onUpdateNote }) => {
    const [editedNote, setEditedNote] = useState<INote>(note);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
    };

    return (
        <div className="mt-20 mx-4">
            <input
                type="text"
                name="title"
                value={editedNote.title}
                onChange={handleChange}
                className="text-2xl font-semibold mb-6 w-full bg-white border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none text-center py-2"
            />

            <textarea
                name="body"
                value={editedNote.body}
                onChange={handleChange}
                className="w-full h-[80vh] bg-white p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 resize-none text-lg"
            />
        </div>
    );
};

export default NoteViewer;
