"use client";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[30px] p-8 shadow-2xl animate-in zoom-in duration-300 border border-gray-100 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl bg-yellow-100 text-yellow-600">
          ?
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">{title}</h3>
        <p className="text-gray-600 font-medium mb-8">{message}</p>
        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-gray-100 text-black rounded-xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-4 bg-black text-white rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}