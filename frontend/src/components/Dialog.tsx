// generic dialog component. Pass children to it that you want to display.

import { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
}: DialogProps) {
  if (!isOpen) {
    return null; // Don't render anything if the dialog is closed
  }

  return (
    <div className="scroll-auto fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-700 p-6 rounded shadow-lg max-w-lg w-full relative">
        <h2 className="text-xl text-white font-semibold mb-4">{title}</h2>
        <div>{children}</div>
        <button
          className="absolute top-2 right-2 text-black font-bold hover:text-red-600 hover:scale-110 transition-colors ease-in-out duration-300"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
