import { Edit, Folder, Trash2 } from 'lucide-react';
import { IFolder } from '../../../Interfaces/IItems';

interface FolderItemProps {
    folder: IFolder;
    onEdit: (folder: IFolder) => void;
    onDelete: (folderId: string) => void;
    onToggle: (folderId: string) => void;
}

const FolderItem = ({
    folder,
    onEdit,
    onDelete,
    onToggle,
}: FolderItemProps) => {
    return (
        <div
            className="group flex items-center p-3 m-2 bg-white hover:bg-slate-300 active:bg-slate-400 rounded-lg transition duration-300 ease-in-out shadow-sm"
            onClick={() => onToggle(folder._id)}
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
                        onEdit(folder);
                    }}
                />
            </span>
            <span className="opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                <Trash2
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        // setIsFolderDialogVisible(true);
                        onDelete(folder._id);
                    }}
                />
            </span>
        </div>
    );
};

export default FolderItem;
