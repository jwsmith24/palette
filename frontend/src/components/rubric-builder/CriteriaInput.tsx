import React, {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";

import { Criteria } from "../../models/types/criteria.ts";
import { Rating } from "../../models/types/rating.ts";
import createRating from "../../models/Rating.ts";
import RatingInput from "./RatingInput.tsx";

export default function CriteriaInput({
  index,
  criterion,
  handleCriteriaUpdate,
  removeCriterion,
}: {
  index: number;
  criterion: Criteria;
  handleCriteriaUpdate: (index: number, criterion: Criteria) => void;
  removeCriterion: (index: number) => void;
}): ReactElement {
  const [ratings, setRatings] = useState<Rating[]>(criterion.ratings);
  const [maxPoints, setMaxPoints] = useState(0); // Initialize state for max points
  const [criteriaTitle, setCriteriaTitle] = useState(criterion.title || "");

  useEffect(() => {
    // Find the rating with the maximum points when the component mounts or ratings change

    if (ratings[0]) {
      // make sure ratings array isn't empty before checking
      const maxRating = ratings.reduce(
        (max, current) => (current.points > max.points ? current : max),
        ratings[0],
      );
      maxRating.points ? setMaxPoints(maxRating.points) : setMaxPoints(0);
    } else {
      setMaxPoints(0);
    }
  }, [ratings]);

  const handleCriterionTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCriteriaTitle(event.target.value);
    const newCriterion = { ...criterion, title: criteriaTitle };
    handleCriteriaUpdate(index, newCriterion);
  };

  const handleRemoveCriteriaButton = (
    event: ReactMouseEvent,
    index: number,
  ) => {
    event.preventDefault();
    removeCriterion(index);
  };

  // Update criterion when ratings change.
  const handleRatingChange = (ratingIndex: number, updatedRating: Rating) => {
    const updatedRatings = ratings.map((rating, index) =>
      index === ratingIndex ? updatedRating : rating,
    );
    setRatings(updatedRatings);
    criterion.ratings = updatedRatings;
    handleCriteriaUpdate(index, criterion);
  };

  // Update criterion when a rating is removed
  const handleRemoveRating = (ratingIndex: number) => {
    const updatedRatings = ratings.filter((_, i) => i !== ratingIndex);
    setRatings(updatedRatings);
    criterion.ratings = updatedRatings;
    handleCriteriaUpdate(index, criterion);
  };

  const renderRatingOptions = () => {
    return ratings.map((rating: Rating, ratingIndex: number) => {
      return (
        <RatingInput
          ratingIndex={ratingIndex}
          rating={rating}
          handleRatingChange={handleRatingChange}
          handleRemoveRating={handleRemoveRating}
        />
      );
    });
  };

  const handleAddRating = (
    event: ReactMouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.preventDefault();
    const newRating = createRating();
    const updatedRatings = [...ratings, newRating];
    setRatings(updatedRatings);
    criterion.ratings = updatedRatings;
    handleCriteriaUpdate(index, criterion);
  };

  const renderCriteriaView = () => {
    return (
      <div className="grid grid-rows-[auto,auto] border border-white p-4 gap-4 rounded-md w-full">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className={"grid self-baseline"}>
            <input
              type="text"
              placeholder={`Criteria ${index + 1} Title...`}
              className={"rounded p-2 text-gray-500"}
              value={criteriaTitle}
              onChange={handleCriterionTitleChange}
            />
            <p className={"text-2xl font-bold mt-4"}>Max Points: {maxPoints}</p>
          </div>

          <div className={"grid gap-2"}>{renderRatingOptions()}</div>
          <div className={"flex gap-3 justify-self-start"}>
            <button
              onClick={(event: ReactMouseEvent<HTMLButtonElement>) =>
                handleRemoveCriteriaButton(event, index)
              }
              className={
                " transition-all ease-in-out duration-300 bg-gray-200 text-black font-bold rounded-lg px-2" +
                " hover:bg-red-500 hover:text-white hover:scale-105 focus:outline-0 focus:bg-red-500"
              }
            >
              Remove
            </button>
          </div>

          <button
            className={
              " transition-all ease-in-out duration-300 bg-gray-200 text-black font-bold rounded-lg px-2" +
              " justify-self-end hover:bg-blue-500 hover:text-white hover:scale-105 focus:outline-0" +
              " focus:bg-blue-500"
            }
            onClick={(event: ReactMouseEvent<HTMLButtonElement>) =>
              handleAddRating(event, index)
            }
          >
            Add Rating
          </button>
        </div>
      </div>
    );
  };

  return <>{renderCriteriaView()}</>;
}
