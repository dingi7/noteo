import React, { useEffect } from 'react';
import { INote } from '../../Interfaces/IItems';
import { toggleAutoSave } from '../../api/requests';
import { Button } from '../../Components/ui/button';

interface Props {
    note: INote;
    setSelectedNote: React.Dispatch<React.SetStateAction<INote | null>>;
    updateNoteInFolders: (
        noteId: string,
        updatedFields: { title?: string; body?: string }
    ) => void;
    user: any;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

const NoteViewer: React.FC<Props> = ({
    note,
    setSelectedNote,
    updateNoteInFolders,
    user,
    hasUnsavedChanges,
    setHasUnsavedChanges,
}) => {
    const [autoSave, setAutoSave] = React.useState<boolean>(
        user.autoSave || false
    );

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (autoSave && hasUnsavedChanges) {
            timer = setTimeout(() => {
                updateNoteInFolders(note._id, {
                    title: note.title,
                    body: note.body,
                });
                setHasUnsavedChanges(false);
            }, 10000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [
        autoSave,
        hasUnsavedChanges,
        note,
        updateNoteInFolders,
        setHasUnsavedChanges,
    ]);

    const handleSave = () => {
        if (!hasUnsavedChanges) return;
        updateNoteInFolders(note._id, {
            title: note.title,
            body: note.body,
        });
        setHasUnsavedChanges(false);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const updatedFields = { [e.target.name]: e.target.value };
        setSelectedNote({ ...note, ...updatedFields });
        setHasUnsavedChanges(true);
    };
    const handleAutoSaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const authState = JSON.parse(
            localStorage.getItem('x-authorization_state')!
        );
        authState.autoSave = e.target.checked;
        localStorage.setItem(
            'x-authorization_state',
            JSON.stringify(authState)
        );
        setAutoSave(e.target.checked);
        toggleAutoSave(e.target.checked);
    };

    return (
        <div className="mt-16 mx-4">
            <div className="flex justify-between mb-2 items-center">
                <Button
                    variant={'gray'}
                    size="default"
                    className="mr-5"
                    onClick={handleSave}
                >
                    Save
                </Button>
                <div className="flex items-center">
                    <label className="mr-2 text-lg font-semibold ml-5">
                        Auto Save:
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="autoSave"
                            checked={autoSave}
                            onChange={handleAutoSaveChange}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
            <input
                type="text"
                name="title"
                value={note.title || ''}
                onChange={handleChange}
                placeholder="Enter title here..."
                className="text-2xl font-semibold mb-6 w-full bg-white border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none text-center py-2"
            />

            <textarea
                name="body"
                value={note.body || ''}
                onChange={handleChange}
                placeholder="Note body"
                className="w-full h-[70vh] bg-white p-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 resize-none text-lg"
            />
        </div>
    );
};

export default NoteViewer;
