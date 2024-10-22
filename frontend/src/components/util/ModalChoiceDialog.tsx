import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * A choice is a button that the user can click to perform an action.
 */
interface Choice {
  label: string; // The text to display on the button
  action: () => void; // The function to call when the button is clicked
  variant?: string; // The variant of the button (e.g., "primary", "secondary")
}

/**
 * This generic component is a modal dialog that presents a message and a set of choices.
 * The choices are rendered as buttons at the bottom of the dialog.
 */
interface ModalChoiceDialogProps {
  show: boolean; // Whether the dialog is visible
  onHide: () => void; // The function to call when the dialog is closed
  message: string; // The message to display in the dialog
  choices: Choice[]; // The choices to present to the user
}

const ModalChoiceDialog: React.FC<ModalChoiceDialogProps> = ({
  show,
  onHide,
  message,
  choices,
}) => {
  if (!show) {
    return null; // Don't render anything if the modal is not visible
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        {/* Title */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Choice Dialog</h2>
        </div>

        {/* Message */}
        <div className="mb-6">
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-around space-x-4">
          {choices.map((choice, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded text-white ${
                choice.variant === "secondary"
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={choice.action}
            >
              {choice.label}
            </button>
          ))}
          <button
            className="py-2 px-4 rounded bg-gray-500 hover:bg-gray-600 text-white"
            onClick={onHide}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChoiceDialog;
