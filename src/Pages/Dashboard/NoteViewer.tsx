// src/NoteViewer.tsx

import React, { useEffect } from 'react';
import { INote } from '../../Interfaces/IItems';

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
        setAutoSave(e.target.value === 'on');
    };

    return (
        <div className="mt-20 mx-4">
            <div className="flex justify-end items-center mb-4">
                <label className="mr-2">Auto Save:</label>
                <div className="flex items-center">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="autoSave"
                            value="on"
                            checked={autoSave}
                            onChange={handleAutoSaveChange}
                        />
                        <span className="ml-2">On</span>
                    </label>
                    <label className="flex items-center ml-4">
                        <input
                            type="radio"
                            name="autoSave"
                            value="off"
                            checked={!autoSave}
                            onChange={handleAutoSaveChange}
                        />
                        <span className="ml-2">Off</span>
                    </label>
                </div>
            </div>
            <input
                type="text"
                name="title"
                value={note.title || ''}
                onChange={handleChange}
                className="text-2xl font-semibold mb-6 w-full bg-white border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none text-center py-2"
            />

            <textarea
                name="body"
                value={note.body || ''}
                onChange={handleChange}
                className="w-full h-[80vh] bg-white p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 resize-none text-lg"
            />
        </div>
    );
};

export default NoteViewer;
