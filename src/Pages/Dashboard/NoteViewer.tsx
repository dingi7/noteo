// src/NoteViewer.tsx

import React, { useEffect } from "react";
import { INote } from "../../Interfaces/IItems";

interface Props {
    note: INote;
    setSelectedNote: React.Dispatch<React.SetStateAction<INote | null>>;
    updateNoteInFolders: (
        noteId: string,
        updatedFields: { title?: string; body?: string }
    ) => void;
}

const NoteViewer: React.FC<Props> = ({
    note,
    setSelectedNote,
    updateNoteInFolders,
}) => {
    const [autoSave, setAutoSave] = React.useState<boolean>(false); // mby change with db
    const [newChanges, setNewChanges] = React.useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (autoSave && newChanges) {
            timer = setTimeout(() => {
                updateNoteInFolders(note._id, {
                    title: note.title,
                    body: note.body,
                });
                setNewChanges(false);
            }, 10000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [autoSave, newChanges, note, updateNoteInFolders]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const updatedFields = { [e.target.name]: e.target.value };
        setSelectedNote({ ...note, ...updatedFields });
        setNewChanges(true);
        // updateNoteInFolders(note._id, updatedFields);
    };
    const handleAutoSaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAutoSave(e.target.value === "on");
    };

    return (
        <div className="mt-16 mx-4">
            <div className="flex justify-end mb-2 items-center">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out mr-2"
                >
                    Save Note
                </button>
                <label className="mr-2 text-lg font-semibold">Auto Save:</label>
                <div className="flex items-center">
                    <label className="flex items-center">
                        <input
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            type="radio"
                            name="autoSave"
                            value="on"
                            checked={autoSave}
                            onChange={handleAutoSaveChange}
                        />
                        <span className="ms-2 text-md font-medium ">On</span>
                    </label>
                    <label className="flex items-center ml-4">
                        <input
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            type="radio"
                            name="autoSave"
                            value="off"
                            checked={!autoSave}
                            onChange={handleAutoSaveChange}
                        />
                        <span className="ms-2 text-md font-medium 0">Off</span>
                    </label>
                </div>
            </div>
            <input
                type="text"
                name="title"
                value={note.title || ""}
                onChange={handleChange}
                className="text-2xl font-semibold mb-6 w-full bg-white border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none text-center py-2"
            />

            <textarea
                name="body"
                value={note.body || ""}
                onChange={handleChange}
                className="w-full h-[70vh] bg-white p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 resize-none text-lg"
            />
        </div>
    );
};

export default NoteViewer;
