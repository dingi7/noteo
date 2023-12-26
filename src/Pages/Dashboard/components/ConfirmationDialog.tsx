import React from 'react';

interface ConfirmationDialogProps {
    isVisible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isVisible,
    message,
    onConfirm,
    onCancel,
}) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <p className="text-lg font-semibold mb-4">{message}</p>
                <div className="flex justify-between space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                        onClick={onConfirm}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};
