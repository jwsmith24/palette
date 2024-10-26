import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { RubricRating } from '../../models/types/RubricRating.ts';

import editDescriptionIcon from '../../assets/description-icon.webp';
import removeIcon from '../../assets/x-icon2.webp';

export default function RatingInput({
  ratingIndex,
  rating, // pass criterion.ratings[index] to keep it short
  handleRatingChange, // callback to handle rating changes
  handleRemoveRating, // callback to handle rating removal
}: {
  ratingIndex: number;
  rating: RubricRating;
  handleRatingChange: (index: number, updatedRating: RubricRating) => void;
  handleRemoveRating: (ratingIndex: number) => void;
}): ReactElement {
  const [ratingValue, setRatingValue] = useState(rating.points || 0); // initialize with saved point value or
  // default to 0.
  const [ratingDescription, setRatingDescription] = useState(
    rating.description || ''
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [longDescription, setLongDescription] = useState(
    rating.longDescription || ''
  );

  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // When the popup opens, focus the cancel button
    if (isPopupOpen && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }

    // Add a listener for the "Escape" key to close the popup
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup event listener on component unmount or popup close
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPopupOpen]);

  const handlePointChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPointValue = Number(event.target.value);
    setRatingValue(newPointValue); // update input value in state
    const newRating = { ...rating, points: newPointValue };
    handleRatingChange(ratingIndex, newRating); // trigger parent update
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    setRatingDescription(newDescription); // update input value in state
    const newRating = { ...rating, description: newDescription };
    handleRatingChange(ratingIndex, newRating); // trigger parent update
  };

  const handleLongDescriptionSave = () => {
    const updatedRating = { ...rating, longDescription };
    handleRatingChange(ratingIndex, updatedRating);
    setIsPopupOpen(false); // Close the popup after saving
  };

  const handleRemoveRatingPress = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    handleRemoveRating(ratingIndex); // trigger removal
  };

  return (
    <div className="grid grid-rows-1 grid-cols-1 w-full relative">
      <div className="grid grid-cols-[0.2fr_0.8fr_0.3fr_0.2fr] gap-3 w-full items-center">
        <input
          type="number"
          value={ratingValue} // use local state for value
          onChange={handlePointChange} // properly handle points change
          className="hover:bg-gray-800 rounded-lg p-2 text-gray-300 w-12 border border-gray-600 bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          required
          title={'set'}
        />
        <input
          type="text"
          className="hover:bg-gray-800 rounded-lg p-3 text-gray-300 border border-gray-600 bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter rating description..."
          value={ratingDescription} // use local state for value
          onChange={handleDescriptionChange} // properly handle description change
        />
        <button
          className="bg-transparent border-none rounded-lg cursor-pointer flex items-center w-12 active:opacity-70 active:bg-green-700 hover:bg-green-700"
          tabIndex={-1}
          onClick={() => setIsPopupOpen(true)}
          type="button"
          title={'Edit long description'}
        >
          <img
            src={editDescriptionIcon}
            alt="Edit"
            className="rounded-xl hover:opacity-60"
          />
        </button>
        <button
          className="w-5 h-5 absolute right-9 bottom-12 mb-1 bg-gray-200 text-black rounded-full opacity-50 hover:bg-red-500 hover:opacity-100 hover:text-white"
          tabIndex={-1}
          onClick={handleRemoveRatingPress} // properly handle the remove button
          type="button"
          title={'Remove rating option'}
        >
          <img
            src={removeIcon}
            alt=""
            className="rounded-full hover:opacity-60"
          />
        </button>
      </div>

      {/* Popup for editing the long description */}
      {isPopupOpen && (
        <div
          className="fixed z-50 inset-0 bg-black bg-opacity-70 flex justify-center items-center"
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              // Prevent tabbing out of the popup
              e.preventDefault();
            }
          }}
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl text-black font-semibold mb-4">
              Edit Long Description
            </h2>
            <textarea
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              className="w-full text-black p-2 border rounded"
              rows={6}
            />
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsPopupOpen(false)}
                ref={cancelButtonRef}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleLongDescriptionSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
