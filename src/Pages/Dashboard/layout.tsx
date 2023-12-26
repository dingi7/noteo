// src/App.tsx

import React, { useCallback, useEffect, useState } from 'react';
import FolderList from './FolderList';
import NoteViewer from './NoteViewer';
import { IFolder, INote } from '../../Interfaces/IItems';
import { Navbar } from '../../Components/ui/navbar';
import { getFolders, updateNote } from '../../api/requests';
import { useAuthUser } from 'react-auth-kit';

const Dashboard: React.FC = () => {
    const user = useAuthUser()();
    const [folders, setFolders] = useState<IFolder[]>([]);
    const [selectedNote, setSelectedNote] = useState<INote | null>(null);
    const fetchData = useCallback(async () => {
        const data = await getFolders();
        setFolders(data);
    }, []);

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
