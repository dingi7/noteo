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
        // setFolders(data);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const [folders, setFolders] = useState<IFolder[]>([
        {
            _id: '1',
            owner: '1',
            name: 'Folder 1',
            notes: [
                {
                    _id: '1',
                    name: 'Note 1',
                    title: 'Note 1',
                    body: 'Body 1',
                    folder: '1',
                },
                {
                    _id: '2',
                    name: 'Note 2',
                    title: 'Note 2',
                    body: 'Body 2',
                    folder: '1',
                },
            ],
        },
        {
            _id: '2',
            name: 'Folder 2',
            owner: '1',
            notes: [
                {
                    _id: '3',
                    title: 'Note 3',
                    name: 'Note 3',
                    body: 'Body 3',
                    folder: '2',
                },
                {
                    _id: '4',
                    title: 'Note 4',
                    name: 'Note 4',
                    body: 'Body 4',
                    folder: '2',
                },
            ],
        },
    ]);
    const [selectedNote, setSelectedNote] = useState<INote | null>(null);

    return (
        <div className="flex h-screen">
            <Navbar></Navbar>
            <div className="w-1/3 bg-gray-200 overflow-auto">
                <FolderList folders={folders} onNoteSelect={setSelectedNote} setFolders={setFolders} />
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
