import React, { ChangeEvent, ReactElement, useState } from "react";
import { Rating } from "palette-types";

export default function UpdatedRatingInput({
  ratingIndex,
  rating,
  handleRatingChange,
  handleRemoveRating,
}: {
  ratingIndex: number;
  rating: Rating;
  handleRemoveRating: (index: number) => void;
  handleRatingChange: (index: number, updatedRating: Rating) => void;
}): ReactElement {
  /**
   * Rating data
   *
   * State
   */
  const [points, setPoints] = useState<number>(rating.points);
  const [title, setTitle] = useState<string>(rating.description);
  const [description, setDescription] = useState<string>(
    rating.longDescription,
  );

  /**
   * Rating data
   *
   * Functionality
   */
  const handlePointChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPointValue = Number(event.target.value);
    setPoints(newPointValue); // update input value in state
    const newRating = { ...rating, points: newPointValue };
    handleRatingChange(ratingIndex, newRating); // trigger parent update
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle); // update input value in state
    const newRating = { ...rating, description: newTitle };
    handleRatingChange(ratingIndex, newRating); // trigger parent update
  };

  const handleDescriptionChange = () => {
    const updatedRating = { ...rating, description };
    handleRatingChange(ratingIndex, updatedRating);
    setIsPopupOpen(false); // Close the popup after saving
  };

  const handleRemoveRatingPress = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    handleRemoveRating(ratingIndex); // trigger removal
  };

  /**
   * Rating menu
   *
   * State
   */
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  /**
   * Rating menu
   *
   * Functionality
   */

  return (
    <div className={"grid grid-rows-2 border-2 border-red-500 w-36 h-36 p-2"}>
      <div className={"grid gap-1"}>
        <div className={"flex gap-2"}>
          <input
            type={"number"}
            className={"px-3 w-16 rounded-full text-black"}
            value={points}
            onChange={handlePointChange}
            min={0}
            max={100}
          />
          <span>Points</span>
        </div>
        <p>{title || "Placeholder Title"}</p>
      </div>
      <div className={"text-xs"}>
        {description || "future description of the rating"}
      </div>
    </div>
  );
}
