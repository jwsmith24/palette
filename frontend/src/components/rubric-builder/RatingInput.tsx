import { ReactElement, useState } from "react";
import { RatingInputProps } from "../../interfaces/RatingInputProps.ts";
/*
RatingInput component maps a criterion's array of ratings to the display.
 */
//todo work in progress - link in actual rating point and title values, add remove button to widget
export default function RatingInput({
  ratingIndex,
  entry, // pass criterion.ratings[index] to keep it short
}: RatingInputProps): ReactElement {
  const [ratingValue, setRatingValue] = useState(entry.points); // initialize with saved point value.
  const [ratingDescription, setRatingDescription] = useState(entry.description);

  return (
    <div className="grid rounded gap-2">
      <h3>Rating Option {ratingIndex + 1}</h3>
      <label htmlFor={`points${ratingIndex}label`}>Points</label>
      <input
        type="number"
        name={`points${ratingIndex}input`}
        id={`points${ratingIndex}input`}
        className="w-1/6 text-gray-600 rounded focus:outline-0"
        defaultValue={0}
        min={0}
        max={100}
        step={0.2} // Increments count by .2 when using the slider
      />
      <label htmlFor={`ratingDesc${ratingIndex}label`}>
        Rating Description
      </label>
      <textarea
        name={`ratingDesc${ratingIndex}text`}
        id={`ratingDesc$${ratingIndex}text`}
        rows={2}
        placeholder="Describe the standards to earn this rating."
        className="rounded-md text-gray-600 border-2 border-gray-300 hover:bg-gray-200 shadow-sm focus:outline-none"
      ></textarea>
    </div>
  );
}
