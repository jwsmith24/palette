import React, { ChangeEvent, ReactElement, useState } from 'react';
import { RubricRating } from '../../models/types/rubricRating';

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
    </div>
  );
}
