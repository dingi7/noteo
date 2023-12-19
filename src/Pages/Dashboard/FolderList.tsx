// src/FolderList.tsx

import React, { useState } from 'react';
import { IFolder, INote } from '../../Interfaces/IItems';
import { Edit } from 'lucide-react';

interface Props {
    folders: IFolder[];
    onNoteSelect: (note: INote) => void;
}

const FolderList: React.FC<Props> = ({ folders, onNoteSelect }) => {
    const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [folderName, setFolderName] = useState<string>('');
    const [noteTitle, setNoteTitle] = useState<string>('');

    const handleFolderEdit = (folder: IFolder) => {
        setEditingFolderId(folder._id);
        setFolderName(folder.name);
    };

    const handleNoteEdit = (note: INote) => {
        setEditingNoteId(note._id);
        setNoteTitle(note.title);
    };

    const saveFolder = () => {
        // onFolderUpdate({
        //     ...folders.find((f) => f._id === editingFolderId)!,
        //     name: folderName,
        // });
        setEditingFolderId(null);
    };

    const saveNote = () => {
        const folder = folders.find((f) =>
            f.notes.some((n) => n._id === editingNoteId)
        )!;
        // onNoteUpdate({
        //     ...folder.notes.find((n) => n._id === editingNoteId)!,
        //     title: noteTitle,
        // });
        setEditingNoteId(null);
    };
    const [openFolderId, setOpenFolderId] = useState<string | null>(null);

    const toggleFolder = (folderId: string) => {
        setOpenFolderId(openFolderId?.includes(folderId) ? null : folderId);
    };

    return (
        <div className="mt-20">
            {folders.map((folder) => (
                <div key={folder._id} className="group mb-2 cursor-pointer" onClick={() => toggleFolder(folder._id)}>
                    {editingFolderId === folder._id ? (
                        <input
                            type="text"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                            onBlur={saveFolder}
                            autoFocus
                        />
                    ) : (
                        <div className="flex items-center">
                            <span
                                className="flex-grow"
                                onClick={() => onNoteSelect(folder.notes[0])}
                            >
                                {folder.name}
                            </span>
                            <span className="opacity-0 group-hover:opacity-100">
                                <Edit
                                    onClick={() => handleFolderEdit(folder)}
                                />
                            </span>
                        </div>
                    )}
                    {openFolderId === folder._id && (
                        <div className="pl-4">
                            {folder.notes.map((note) => (
                                <div
                                    key={note._id}
                                    className="cursor-pointer hover:bg-gray-300 p-2 text-left"
                                    onClick={() => onNoteSelect(note)}
                                >
                                    {note.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FolderList;
