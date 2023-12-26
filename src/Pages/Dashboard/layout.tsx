// src/App.tsx

import React, { useCallback, useEffect, useState } from 'react';
import FolderList from './FolderList';
import NoteViewer from './NoteViewer';
import { IFolder, INote } from '../../Interfaces/IItems';
import { Navbar } from '../../Components/ui/navbar';
import { getFolders, updateNote } from '../../api/requests';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const user = useAuthUser()();
    const isAuth = useIsAuthenticated()();

    const [folders, setFolders] = useState<IFolder[]>([]);
    const [selectedNote, setSelectedNote] = useState<INote | null>(null);
    const fetchData = useCallback(async () => {
        if (isAuth) {
            const data = await getFolders();
            setFolders(data);
        }
    }, [isAuth]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const updateNoteInFolders = async (
        noteId: string,
        updatedFields: {
            title?: string;
            body?: string;
        }
    ) => {
        const updatedNote: INote = await updateNote(noteId, updatedFields);

        const updatedFolders = folders.map((folder) => {
            const isMatchingFolder =
                typeof updatedNote.folder === 'string'
                    ? folder._id === updatedNote.folder
                    : folder._id === updatedNote.folder._id;

            if (isMatchingFolder) {
                return {
                    ...folder,
                    notes: folder.notes.map((note) => {
                        if (note._id === noteId) {
                            return updatedNote;
                        }
                        return note;
                    }),
                };
            }
            return folder;
        });

        setFolders(updatedFolders);
    };

    if (!isAuth) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Navbar></Navbar>
                <div className="text-center">
                    <p className="mb-4 text-lg font-semibold">Not Authorized</p>
                    <Link to="/login">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                            Go to Login
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <Navbar></Navbar>
            <div className="w-1/3 bg-gray-200 overflow-auto">
                <FolderList
                    folders={folders}
                    onNoteSelect={setSelectedNote}
                    selecteNote={selectedNote}
                    setFolders={setFolders}
                />
            </div>
            <div className="w-2/3 p-4 overflow-auto">
                {selectedNote && (
                    <NoteViewer
                        note={selectedNote}
                        setSelectedNote={setSelectedNote}
                        updateNoteInFolders={updateNoteInFolders}
                        user={user}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
