import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Rating } from '../../models/types/rating.ts';

export default function RatingInput({
  ratingIndex,
  rating, // pass criterion.ratings[index] to keep it short
  handleRatingChange, // callback to handle rating changes
  handleRemoveRating, // callback to handle rating removal
}: {
  ratingIndex: number;
  rating: Rating;
  handleRatingChange: (index: number, updatedRating: Rating) => void;
  handleRemoveRating: (ratingIndex: number) => void;
}): ReactElement {
  const [ratingValue, setRatingValue] = useState(rating.points || 0); // initialize with saved point value or
  // default to 0.
  const [ratingDescription, setRatingDescription] = useState(
    rating.description || ''
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [longDescription, setLongDescription] = useState(
    rating.longDescription || ""
  );

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
    <div className={'grid grid-rows-1 grid-col-3 grid-flow-col gap-2 w-full'}>
      <input
        type="number"
        value={ratingValue} // use local state for value
        onChange={handlePointChange} // properly handle points change
        className="hover:bg-gray-800 rounded-lg p-3 text-gray-300 w-16 border border-gray-600 bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="0"
        required
      />
      <input
        type="text"
        className="hover:bg-gray-800 rounded-lg p-3 text-gray-300 border border-gray-600 bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter rating description..."
        value={ratingDescription} // use local state for value
        onChange={handleDescriptionChange} // properly handle description change
      />
      <button
        className={
          'bg-gray-200 text-black px-2 py-1 rounded opacity-20 hover:bg-red-500 hover:opacity-100' +
          ' hover:text-white'
        }
        tabIndex={-1}
        onClick={handleRemoveRatingPress} // properly handle the remove button
        type={'button'}
      >
        -
      </button>
      {/* Button to trigger editing of long description */}
      <button
        className="text-blue-500 hover:underline"
        onClick={() => setIsPopupOpen(true)}
        type="button"
      >
        Edit Long Description
      </button>

      {/* Popup for editing the long description */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
