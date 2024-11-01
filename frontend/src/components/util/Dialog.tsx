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
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
        <h2 className="text-xl text-black font-semibold mb-4">{title}</h2>
        <div>{children}</div>
        <button
          className="absolute top-3 right-4 text-black font-bold"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
