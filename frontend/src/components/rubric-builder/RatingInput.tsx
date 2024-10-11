import { ChangeEvent, ReactElement, useState } from "react";
import Rating from "../../Rating.ts";
/*
RatingInput component maps a criterion's array of ratings to the display.
 */
//todo work in progress - link in actual rating point and title values, add remove button to widget
export default function RatingInput({
  ratingIndex,
  rating, // pass criterion.ratings[index] to keep it short
  updateRating, // callback to handle rating changes
}: {
  ratingIndex: number;
  rating: Rating;
  updateRating: (index: number, updatedRating: Rating) => void;
}): ReactElement {
  const [ratingValue, setRatingValue] = useState(rating.points); // initialize with saved point value.
  const [ratingDescription, setRatingDescription] = useState(
    rating.description,
  );

  const handlePointChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPointValue = Number(event.target.value);
    setRatingValue(newPointValue); // update input value
    const newRating = { ...rating, points: newPointValue };
    updateRating(ratingIndex, newRating);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value;
    setRatingDescription(newDescription);
    updateRating(ratingIndex, {
      ...rating,
      points: ratingValue,
      description: newDescription,
    }); // Use updated description
  };
  return (
    <div className="grid text-gray-700">
      <h3 className={"font-semibold text-gray-900"}>
        Rating Option {ratingIndex + 1}
      </h3>
      <label htmlFor={`points${ratingIndex}label`}>Points</label>
      <input
        type="number"
        name={`points${ratingIndex}input`}
        id={`points${ratingIndex}input`}
        className={
          "rounded p-2 hover:bg-gray-100 border-2 border-gray-300 focus:border-blue-500 resize-none w-1/3"
        }
        value={ratingValue}
        min={0}
        max={100}
        step={0.2} // Increments count by .2 when using the slider
        onChange={handlePointChange}
      />
      <label htmlFor={`ratingDesc${ratingIndex}text`}>Rating Description</label>
      <textarea
        name={`ratingDesc${ratingIndex}text`}
        id={`ratingDesc$${ratingIndex}text`}
        rows={4}
        value={ratingDescription}
        placeholder={"Describe how to earn the rating..."}
        className={
          "rounded mb-2 p-2 hover:bg-gray-100 border-2 border-gray-300 focus:border-blue-500 resize-none"
        }
        onChange={handleDescriptionChange}
      ></textarea>
    </div>
  );
}
