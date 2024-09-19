import React from 'react'

interface CardModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#181818] p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    )
}
