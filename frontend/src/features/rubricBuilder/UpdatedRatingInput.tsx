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
  const [points, setPoints] = useState<number>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
    <div className={"grid grid-rows-2 border-2 border-red-500"}>rating</div>
  );
}
