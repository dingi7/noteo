// src/FolderList.tsx

import React, { Dispatch, SetStateAction, useState } from 'react';
import { IFolder, INote } from '../../Interfaces/IItems';
import { Edit, Folder, StickyNote, Plus, Trash2 } from 'lucide-react';
import {
    createFolder,
    createNote,
    renameFolder,
    renameNote,
} from "../../api/requests";

interface Props {
    folders: IFolder[];
    onNoteSelect: (note: INote | null) => void;
    setFolders: Dispatch<SetStateAction<IFolder[]>>;
    selecteNote: INote | null;
}

const FolderList: React.FC<Props> = ({
    folders,
    onNoteSelect,
    setFolders,
    selecteNote,
}) => {
    const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [folderName, setFolderName] = useState<string>("");
    const [noteName, setNoteName] = useState<string>("");
    const [openFolderId, setOpenFolderId] = useState<string | null>(null);

    const handleFolderEdit = (folder: IFolder) => {
        setEditingFolderId(folder._id);
        setFolderName(folder.name);
    };

    const handleNoteEdit = (note: INote) => {
        setEditingNoteId(note._id);
        setNoteName(note.name);
    };
    const handleNewNote = async (folder: IFolder) => {
        const newNote = await createNote("New Note", folder._id);
        const updatedFolders = folders.map((folder) => {
            if (folder._id === openFolderId) {
                return { ...folder, notes: [...folder.notes, newNote] };
            }
            return folder;
        });
        setFolders(updatedFolders);
        setNoteName("");
    };

    const handleNewFolder = async () => {
        const newFolder = await createFolder("New Folder");
        setFolders([...folders, newFolder]);
        setFolderName("");
    };

    const saveFolder = async () => {
        setFolders(
            folders.map((folder) => {
                if (folder._id === editingFolderId) {
                    return { ...folder, name: folderName };
                }
                return folder;
            })
        );
        await renameFolder(editingFolderId!, folderName);
        setEditingFolderId(null);
    };

    const saveNote = async () => {
        setFolders(
            folders.map((folder) => {
                if (folder._id === openFolderId) {
                    return {
                        // some folderq
                        ...folder,
                        notes: folder.notes.map((note) => {
                            if (note._id === editingNoteId) {
                                return { ...note, name: noteName };
                            }
                            return note;
                        }),
                    };
                }
                return folder;
            })
        );
        console.log("🚀 ~ file: FolderList.tsx:87 ~ saveNote ~ noteName:", noteName)
        console.log("🚀 ~ file: FolderList.tsx:87 ~ saveNote ~ editingNoteId:", editingNoteId)
        await renameNote(editingNoteId!, noteName);
        setEditingNoteId(null);
    };

    const toggleFolder = (folderId: string) => {
        setOpenFolderId(openFolderId?.includes(folderId) ? null : folderId);
        onNoteSelect(null);
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
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        saveFolder();
                                    }
                                }}
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
                            <span className="flex-grow ml-2 font-semibold text-lg text-gray-800 cursor-pointer">
                                {folder.name}
                            </span>
                            <span className="opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                                <Edit
                                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFolderEdit(folder);
                                    }}
                                />
                            </span>
                        </div>
                    )}
                    {openFolderId === folder._id && (
                        <div className="pl-5 mt-2 pr-2">
                            {folder.notes.map((note) => (
                                <div key={note._id} className="group mb-2">
                                    {editingNoteId === note._id ? (
                                        <input
                                            type="text"
                                            value={noteName}
                                            onChange={(e) =>
                                                setNoteName(e.target.value)
                                            }
                                            onBlur={saveNote}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    saveNote();
                                                }
                                            }}
                                            autoFocus
                                            className="cursor-pointer p-3 w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                        />
                                    ) : (
                                        <div
                                            className="group cursor-pointer p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out flex items-center gap-2"
                                            onClick={() => onNoteSelect(note)}
                                        >
                                            <span>
                                                <StickyNote />
                                            </span>
                                            <h3 className="flex-grow ml-2 font-semibold text-md text-gray-800 cursor-pointer">
                                                {note.name}
                                            </h3>
                                            <span className="opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                                                <Edit
                                                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleNoteEdit(note);
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    )}
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
            <div
                className="cursor-pointer p-3 group mb-2 ml-2 mr-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out flex items-center gap-2"
                onClick={() => {
                    handleNewFolder();
                }}
            >
                <span>
                    <Plus />
                </span>
                <h3 className="text-md font-normal text-gray-800">
                    Add Folder
                </h3>
            </div>
        </div>
    );
};

export default FolderList;
