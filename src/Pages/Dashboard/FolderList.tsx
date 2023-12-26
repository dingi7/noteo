// src/FolderList.tsx

import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { IFolder, INote } from '../../Interfaces/IItems';
import { Plus } from 'lucide-react';
import {
    createFolder,
    createNote,
    deleteFolder,
    deleteNote,
    renameFolder,
    renameNote,
} from '../../api/requests';
import { ConfirmationDialog } from './components/ConfirmationDialog';
import FolderItem from './components/FolderItem';
import NoteItem from './components/NoteItem';

interface Props {
    folders: IFolder[];
    onNoteSelect: (note: INote | null) => void;
    setFolders: Dispatch<SetStateAction<IFolder[]>>;
    selectedNote: INote | null;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

const FolderList: React.FC<Props> = ({
    folders,
    onNoteSelect,
    setFolders,
    selectedNote,
    hasUnsavedChanges,
    setHasUnsavedChanges,
}) => {
    const [isFolderDialogVisible, setIsFolderDialogVisible] = useState(false);
    const [isNoteDialogVisible, setIsNoteDialogVisible] = useState(false);
    const [isUnsavedChangesDialogVisible, setIsUnsavedChangesDialogVisible] =
        useState(false);
    const [pendingNote, setPendingNote] = useState<INote | null>(null);
    const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [folderName, setFolderName] = useState<string>('');
    const [noteName, setNoteName] = useState<string>('');
    const [openFolderId, setOpenFolderId] = useState<string | null>(null);
    const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null);
    const [folderToDeleteId, setFolderToDeleteId] = useState<string | null>(
        null
    );

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            if (hasUnsavedChanges) {
                event.preventDefault();
                event.returnValue =
                    'You have unsaved changes! Are you sure you want to leave?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    const checkUnsavedChangesBeforeAction = useCallback(
        (action: () => void, override?: boolean) => {
            if (hasUnsavedChanges && !override) {
                setIsUnsavedChangesDialogVisible(true);
                return () => {
                    action();
                    setHasUnsavedChanges(false);
                };
            } else {
                action();
            }
        },
        [hasUnsavedChanges, setHasUnsavedChanges]
    );

    const onNoteDelete = useCallback((noteId: string) => {
        setNoteToDeleteId(noteId);
        setIsNoteDialogVisible(true);
    }, []);

    const onFolderDelete = useCallback((folderId: string) => {
        setFolderToDeleteId(folderId);
        setIsFolderDialogVisible(true);
    }, []);

    const handleFolderDelete = useCallback(async () => {
        const updatedFolders = folders.filter(
            (folder) => folder._id !== folderToDeleteId
        );
        setFolders(updatedFolders);
        await deleteFolder(folderToDeleteId!);
        setFolderToDeleteId(null);
        setIsFolderDialogVisible(false);
    }, [folders, folderToDeleteId, setFolders]);

    const handleNoteDelete = useCallback(async () => {
        const updatedFolders = folders.map((folder) => {
            if (folder._id === openFolderId) {
                return {
                    ...folder,
                    notes: folder.notes.filter(
                        (note) => note._id !== noteToDeleteId
                    ),
                };
            }
            return folder;
        });
        setFolders(updatedFolders);
        await deleteNote(noteToDeleteId!);
        setNoteToDeleteId(null);
        setIsNoteDialogVisible(false);
    }, [folders, noteToDeleteId, openFolderId, setFolders]);

    const handleFolderEdit = useCallback((folder: IFolder) => {
        setEditingFolderId(folder._id);
        setFolderName(folder.name);
    }, []);

    const handleNoteEdit = useCallback((note: INote) => {
        setEditingNoteId(note._id);
        setNoteName(note.name);
    }, []);

    const handleNewNote = useCallback(
        async (folder: IFolder) => {
            const newNote = await createNote('New Note', folder._id);
            const updatedFolders = folders.map((f) =>
                f._id === openFolderId
                    ? { ...f, notes: [...f.notes, newNote] }
                    : f
            );
            setFolders(updatedFolders);
            setNoteName('');
        },
        [openFolderId, folders, setFolders]
    );

    const handleNewFolder = useCallback(async () => {
        const newFolder = await createFolder('New Folder');
        setFolders((prevFolders) => [...prevFolders, newFolder]);
        setFolderName('');
    }, [setFolders]);

    const saveFolder = useCallback(async () => {
        const updatedFolders = folders.map((f) =>
            f._id === editingFolderId ? { ...f, name: folderName } : f
        );
        setFolders(updatedFolders);
        await renameFolder(editingFolderId!, folderName);
        setEditingFolderId(null);
    }, [editingFolderId, folderName, folders, setFolders]);

    const saveNote = useCallback(async () => {
        const updatedFolders = folders.map((f) => {
            if (f._id === openFolderId) {
                return {
                    ...f,
                    notes: f.notes.map((n) =>
                        n._id === editingNoteId ? { ...n, name: noteName } : n
                    ),
                };
            }
            return f;
        });
        setFolders(updatedFolders);
        await renameNote(editingNoteId!, noteName);
        setEditingNoteId(null);
    }, [editingNoteId, noteName, openFolderId, folders, setFolders]);

    const toggleFolder = useCallback(
        (folderId: string) => {
            checkUnsavedChangesBeforeAction(() => {
                setOpenFolderId((prevOpenFolderId) =>
                    prevOpenFolderId?.includes(folderId) ? null : folderId
                );
                onNoteSelect(null);
            });
        },
        [checkUnsavedChangesBeforeAction, onNoteSelect]
    );

    const handleNoteSelection = useCallback(
        (note: INote | null) => {
            setPendingNote(note);
            checkUnsavedChangesBeforeAction(() => {
                onNoteSelect(note);
                setPendingNote(null);
            });
        },
        [checkUnsavedChangesBeforeAction, onNoteSelect]
    );

    return (
        <div className="mt-20">
            <ConfirmationDialog
                isVisible={isFolderDialogVisible}
                message="Are you sure you want to delete this folder and all notes in it?"
                onConfirm={() => {
                    handleFolderDelete();
                }}
                onCancel={() => {
                    setIsFolderDialogVisible(false);
                    setFolderToDeleteId(null);
                }}
            />
            <ConfirmationDialog
                isVisible={isNoteDialogVisible}
                message="Are you sure you want to delete this note?"
                onConfirm={() => {
                    handleNoteDelete();
                }}
                onCancel={() => {
                    setIsNoteDialogVisible(false);
                    setNoteToDeleteId(null);
                }}
            />
            <ConfirmationDialog
                isVisible={isUnsavedChangesDialogVisible}
                message="You have unsaved changes! Are you sure you want to leave?"
                onConfirm={() => {
                    setIsUnsavedChangesDialogVisible(false);
                    setHasUnsavedChanges(false);
                    checkUnsavedChangesBeforeAction(
                        () => onNoteSelect(pendingNote),
                        true
                    );
                }}
                onCancel={() => setIsUnsavedChangesDialogVisible(false)}
            />
            {folders.map((folder) => (
                <div key={folder._id} className="mb-2 cursor-pointer">
                    {editingFolderId === folder._id ? (
                        <div className="p-2">
                            <input
                                type="text"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                onBlur={saveFolder}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        saveFolder();
                                    }
                                }}
                                autoFocus
                                className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                            />
                        </div>
                    ) : (
                        <FolderItem
                            folder={folder}
                            onEdit={handleFolderEdit}
                            onDelete={onFolderDelete}
                            onToggle={toggleFolder}
                        ></FolderItem>
                    )}
                    {openFolderId === folder._id && (
                        <div className="pl-5 mt-2 pr-2">
                            {folder.notes.map((note) => (
                                <div key={note._id} className={`group mb-2`}>
                                    {editingNoteId === note._id ? (
                                        <input
                                            type="text"
                                            value={noteName}
                                            onChange={(e) =>
                                                setNoteName(e.target.value)
                                            }
                                            onBlur={saveNote}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    saveNote();
                                                }
                                            }}
                                            autoFocus
                                            className="cursor-pointer p-3 w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                                        />
                                    ) : (
                                        <NoteItem
                                            note={note}
                                            onDelete={onNoteDelete}
                                            onEdit={handleNoteEdit}
                                            onSelect={() =>
                                                handleNoteSelection(note)
                                            }
                                            selectedNote={selectedNote}
                                        ></NoteItem>
                                    )}
                                </div>
                            ))}
                            <div
                                className="group cursor-pointer p-3 mb-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out flex items-center gap-2"
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
