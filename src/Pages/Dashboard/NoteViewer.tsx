// src/NoteViewer.tsx

import React, { useState } from 'react';
import { INote } from '../../Interfaces/IItems';

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
        <div className="mt-20">
            <input
                type="text"
                name="title"
                value={editedNote.title}
                onChange={handleChange}
                className="text-xl font-bold mb-4 w-full justify-center text-center focus:outline-none"
            />

            <textarea
                name="body"
                value={editedNote.body}
                onChange={handleChange}
                className="w-full h-screen p-4 resize-none focus:outline-none"
            />
        </div>
    );
};

export default NoteViewer;
