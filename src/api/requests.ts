import { LoginUserData, RegisterUserData } from '../Interfaces/IUserData';
import * as api from './api';

export const endpoints = {
    registerUser: '/auth/register',
    loginUser: '/auth/login',
    folder: (folderId: string | null) =>
        folderId ? `/items/folders/${folderId}` : `/items/folders`,
    note: (noteId: string | null) =>
        noteId ? `/items/notes/${noteId}` : `/items/notes`,
};

export const registerUser = async (userData: RegisterUserData) => {
    return api.post(endpoints.registerUser, userData);
};

export const loginUser = async (userData: LoginUserData) => {
    return api.post(endpoints.loginUser, userData);
};

export const getFolder = async (folderId: string) => {
    return api.get(endpoints.folder(folderId));
};

export const createFolder = async (folderName: string) => {
    return api.post(endpoints.folder(null), { name: folderName });
};

export const deleteFolder = async (folderId: string) => {
    return api.del(endpoints.folder(folderId));
};

export const renameFolder = async (folderId: string, folderName: string) => {
    return api.put(endpoints.folder(folderId), { name: folderName });
};

export const getFolders = async () => {
    return api.get(endpoints.folder(null));
};

export const getNote = async (noteId: string) => {
    return api.get(endpoints.note(noteId));
};

export const createNote = async (noteData: any) => {
    return api.post(endpoints.note(null), noteData);
};

export const deleteNote = async (noteId: string) => {
    return api.del(endpoints.note(noteId));
};

export const getNotes = async () => {
    return api.get(endpoints.note(null));
};