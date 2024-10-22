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
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Choice Dialog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        {choices.map((choice, index) => (
          <Button
            key={index}
            variant={choice.variant || "primary"}
            onClick={choice.action}
          >
            {choice.label}
          </Button>
        ))}
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalChoiceDialog;
