export interface IFolder{
    name: string;
    notes: INote[];
    owner: string;
    _id: string;
}

export interface INote{
    name: string;
    title: string;
    body: string;
    folder: IFolder | string;
    _id: string;
}