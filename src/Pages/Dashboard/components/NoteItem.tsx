import { Edit, StickyNote, Trash2 } from 'lucide-react';
import { INote } from '../../../Interfaces/IItems';

interface NoteItemProps {
    note: INote;
    selectedNote: INote | null;
    onSelect: (note: INote) => void;
    onEdit: (note: INote) => void;
    onDelete: (noteId: string) => void;
}

const NoteItem = ({
    note,
    selectedNote,
    onEdit,
    onDelete,
    onSelect,
}: NoteItemProps) => {
    return (
        <div
            className={`group cursor-pointer p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 ease-in-out flex items-center gap-2 ${
                note._id === selectedNote?._id ? 'bg-blue-100' : 'bg-white'
            }`}
            onClick={() => onSelect(note)}
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
                        onEdit(note);
                    }}
                />
            </span>
            <span className="opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                <Trash2
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(note._id);
                    }}
                />
            </span>
        </div>
    );
};

export default NoteItem;