// src/App.tsx

import React, { useCallback, useEffect, useState } from 'react';
import FolderList from './FolderList';
import NoteViewer from './NoteViewer';
import { IFolder, INote } from '../../Interfaces/IItems';
import { Navbar } from '../../Components/ui/navbar';
import { getFolders } from '../../api/requests';

const Dashboard: React.FC = () => {
    const fetchData = useCallback(async () => {
        const data = await getFolders();
        setFolders(data);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const [folders, setFolders] = useState<IFolder[]>([]);
    const [selectedNote, setSelectedNote] = useState<INote | null>(null);

    return (
        <div className="flex h-screen">
            <Navbar></Navbar>
            <div className="w-1/3 bg-gray-200 overflow-auto">
                <FolderList
                    folders={folders}
                    onNoteSelect={setSelectedNote}
                    setFolders={setFolders}
                />
            </div>
            <div className="w-2/3 p-4 overflow-auto">
                {selectedNote && (
                    <NoteViewer
                        note={selectedNote}
                        setSelectedNote={setSelectedNote}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
