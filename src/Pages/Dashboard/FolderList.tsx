// src/FolderList.tsx

import React, { Dispatch, SetStateAction, useState } from "react";
import { IFolder, INote } from "../../Interfaces/IItems";
import { Edit, Folder, StickyNote, Plus } from "lucide-react";

interface Props {
    folders: IFolder[];
    onNoteSelect: (note: INote) => void;
    setFolders: Dispatch<SetStateAction<IFolder[]>>;
}

const FolderList: React.FC<Props> = ({ folders, onNoteSelect, setFolders }) => {
    const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [folderName, setFolderName] = useState<string>("");
    const [noteTitle, setNoteTitle] = useState<string>("");

    const handleFolderEdit = (folder: IFolder) => {
        setEditingFolderId(folder._id);
        setFolderName(folder.name);
    };

    const handleNoteEdit = (note: INote) => {
        setEditingNoteId(note._id);
        setNoteTitle(note.title);
    };
    const handleNewNote = (folder: IFolder) => {
        const newId = () => {
            const timestamp = Date.now().toString(36);
            const randomString = Math.random().toString(36).substring(2, 5);
            return timestamp + randomString;
        };
        const updatedFolders = folders.map((folder) => {
            if (folder._id === openFolderId) {
                const newNote = {
                    name: "New Note",
                    title: "Add Title",
                    body: "Add note ...",
                    folder: folder._id,
                    _id: newId(),
                };
                return { ...folder, notes: [...folder.notes, newNote] };
            }
            return folder;
        });
        setFolders(updatedFolders);
        setNoteTitle("");
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
                <div key={folder._id} className="group mb-2 cursor-pointer">
                    {editingFolderId === folder._id ? (
                        <div className="p-2">
                            <input
                                type="text"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                onBlur={saveFolder}
                                autoFocus
                                className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            />
                        </div>
                    ) : (
                        <div
                            className="flex items-center p-3 m-2 bg-white hover:bg-slate-300 active:bg-slate-400 rounded-lg transition duration-300 ease-in-out shadow-sm"
                            onClick={() => toggleFolder(folder._id)}
                        >
                            <span className="text-xl text-gray-600">
                                <Folder />
                            </span>
                            <span
                                className="flex-grow ml-2 font-semibold text-lg text-gray-800 cursor-pointer"
                                onClick={() => onNoteSelect(folder.notes[0])}
                            >
                                {folder.name}
                            </span>
                            <span className="opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                                <Edit
                                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                                    onClick={() => handleFolderEdit(folder)}
                                />
                            </span>
                        </div>
                    )}
                    {openFolderId === folder._id && (
                        <div className="pl-5 mt-2 pr-2">
                            {folder.notes.map((note) => (
                                <div
                                    key={note._id}
                                    className="cursor-pointer p-3 mb-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out flex items-center gap-2"
                                    onClick={() => onNoteSelect(note)}
                                >
                                    <span>
                                        <StickyNote />
                                    </span>
                                    <h3 className="text-md font-semibold text-gray-800">
                                        {note.title}
                                    </h3>
                                </div>
                            ))}
                            <div
                                className="cursor-pointer p-3 mb-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out flex items-center gap-2"
                                onClick={() => handleNewNote(folder)}
                            >
                                <span>
                                    <Plus />
                                </span>
                                <h3 className="text-md font-semibold text-gray-800">
                                    Add Note
                                </h3>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FolderList;
