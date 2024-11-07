import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";

import { useSortable } from "@dnd-kit/sortable"; // Import useSortable
import { CSS } from "@dnd-kit/utilities"; // Import CSS utilities
import RatingInput from "./RatingInput";
import { Criteria, Rating } from "palette-types";
import { calcMaxPoints } from "@utils/calculateMaxPoints";
import { createRating } from "@utils/rubricFactory";
import TemplateSetter from "./TemplateSetter";
import { Template } from "../../../../palette-types/src/types/Template.ts";
import Dialog from "@components/Dialog";

export default function CriteriaInput({
  index,
  activeCriterionIndex,
  criterion,
  handleCriteriaUpdate,
  removeCriterion,
  setActiveCriterionIndex,
}: {
  index: number;
  activeCriterionIndex: number;
  criterion: Criteria;
  handleCriteriaUpdate: (index: number, criterion: Criteria) => void;
  removeCriterion: (index: number) => void;
  setActiveCriterionIndex: (index: number) => void;
}): ReactElement {
  const [ratings, setRatings] = useState<Rating[]>(criterion.ratings);
  const [maxPoints, setMaxPoints] = useState<number>(0); // Initialize state for max points
  const [templateSetterActive, setTemplateSetterActive] = useState(false); // file input display is open or not
  const [criteriaDescription, setCriteriaDescription] = useState(
    criterion.description || ""
  );

  const [templateTitle, setTemplateTitle] = useState(criterion.template || "");

  /**
   * Whenever ratings change, recalculate criterion's max points
   */
  useEffect(() => {
    console.log("rerender");
    const maxRating = calcMaxPoints(ratings);
    setMaxPoints(maxRating);
    const newCriterion = { ...criterion, points: maxRating };
    handleCriteriaUpdate(index, newCriterion);
  }, [ratings]);

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    setCriteriaDescription(newDescription);

    const newCriterion = { ...criterion, description: newDescription };
    handleCriteriaUpdate(index, newCriterion);
  };

  const handleSetTemplateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTemplateTitle(newTitle);
    const newCriterion = { ...criterion, template: templateTitle };
    handleCriteriaUpdate(index, newCriterion);
  };

  const handleRemoveCriteriaButton = (
    event: ReactMouseEvent,
    index: number
  ) => {
    console.log("removing the criterion!");
    event.preventDefault();
    event.stopPropagation();
    setTimeout(() => {
      removeCriterion(index);
    }, 300); // removes criterion after the 300ms animation
  };

  // Update criterion when ratings change.

  const handleRatingChange = (ratingIndex: number, updatedRating: Rating) => {
    const updatedRatings = ratings.map((rating, index) =>
      index === ratingIndex ? updatedRating : rating
    );
    setRatings(updatedRatings);
    criterion.ratings = updatedRatings;
    handleCriteriaUpdate(index, criterion);
  };

  // Update criterion when a rating is removed
  const handleRemoveRating = (ratingIndex: number) => {
    console.log(`removing rating at ${ratingIndex}`);
    const updatedRatings = ratings.filter((_, i) => i !== ratingIndex);
    setRatings(updatedRatings);
    criterion.ratings = updatedRatings;
    handleCriteriaUpdate(index, criterion);
  };

  const renderRatingOptions = () => {
    return ratings.map((rating: Rating, ratingIndex: number) => {
      return (
        <RatingInput
          key={rating.key}
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
    index: number
  ) => {
    event.preventDefault();
    const updatedRatings = [...ratings, createRating()];
    setRatings(updatedRatings);
    criterion.ratings = updatedRatings;
    handleCriteriaUpdate(index, criterion);
  };

  const handleExpandCriterion = () => {
    setActiveCriterionIndex(index);
  };

  const handleTemplateSetterPress = (
    event: ReactMouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!templateSetterActive) {
      setTemplateSetterActive(true);
    }
  };

  // Use the useSortable hook to handle criteria ordering
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: criterion.key,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTemplatesOpen = () => {
    console.log("Templates open");
  };

  const renderTemplateSetter = () => {
    //console.log("Test");
    if (templateSetterActive) {
      return (
        <TemplateSetter
          closeTemplateCard={handleCloseTemplateSetter}
          onTemplatesOpen={handleTemplatesOpen}
          handleSetTemplateTitle={handleSetTemplateTitle}
          onTemplateSelected={getTemplate}
          criterion={criterion}
        />
      );
    }
  };

  const getTemplate = (data: Template) => {
    console.log("hello from the parent component");
    console.log(data);
  };

  const handleCloseTemplateSetter = () => {
    setTemplateSetterActive(false); // hides the template setter
  };

  const renderCondensedView = () => {
    return (
      <div
        ref={setNodeRef} // Set the ref here for the sortable functionality
        style={style} // Apply the sortable style
        {...attributes} // Spread the attributes
        {...listeners} // Spread the listeners
        className={`hover:bg-gray-500 hover:cursor-pointer max-h-12 flex justify-between items-center border border-gray-700 shadow-xl p-6 rounded-lg w-full bg-gray-700
        }`}
        onDoubleClick={handleExpandCriterion}
      >
        <div className="text-gray-300">
          <strong>{criteriaDescription}</strong> - Max Points: {maxPoints}
        </div>
        <div className={"flex gap-3"}>
          <button
            onPointerDown={(
              event: ReactMouseEvent // Change to onPointerDown
            ) => handleRemoveCriteriaButton(event, index)}
            type={"button"}
            className="transition-all ease-in-out duration-300 bg-red-600 text-white font-bold rounded-lg px-2 py-1 hover:bg-red-700 focus:outline-none border-2 border-transparent"
          >
            Remove
          </button>
          <button
            onPointerDown={handleExpandCriterion}
            type={"button"}
            className="transition-all ease-in-out duration-300 bg-emerald-600 text-white font-bold rounded-lg px-2 py-1 hover:bg-emerald-700 focus:outline-none border-2 border-transparent"
          >
            Edit
          </button>
        </div>
      </div>
    );
  };

  const renderDetailedView = () => {
    return (
      <div className=" grid border border-gray-700 shadow-xl p-6 gap-6 rounded-lg w-full bg-gray-700">
        <div className="grid mt-4 mr-3 grid-cols-2 gap-4 items-start content-between">
          <div className={"grid self-baseline"}>
            <input
              type="text"
              placeholder={`Criteria ${index + 1} Description...`}
              className="rounded-lg p-3 text-gray-300 border border-gray-600 bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-800"
              value={criteriaDescription}
              onChange={handleDescriptionChange}
            />
            <p className="text-xl font-semibold mt-2 text-gray-200">
              Max Points: {maxPoints}
            </p>
          </div>

          <div className={"grid gap-8"}>{renderRatingOptions()}</div>

          <div className={"flex gap-3 justify-self-start"}>
            <button
              onPointerDown={(event: ReactMouseEvent<HTMLButtonElement>) =>
                handleRemoveCriteriaButton(event, index)
              }
              className={
                "transition-all ease-in-out duration-300 bg-red-600 text-white font-bold rounded-lg px-4" +
                " py-2 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
              }
              type={"button"}
            >
              Remove
            </button>
            <button
              className={
                "transition-all ease-in-out duration-300 bg-amber-600 text-white font-bold rounded-lg px-4" +
                " py-2 hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              }
              onPointerDown={() => {
                setActiveCriterionIndex(-1); // setting the index to -1 will ensure the current criteria will
                // condense and another one won't open
              }}
              type={"button"}
            >
              Collapse
            </button>
            <button
              className={
                "transition-all ease-in-out duration-300 bg-slate-600 rounded-full px-2" +
                " py-2 hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:outline-none"
              }
              onClick={handleTemplateSetterPress}
              type={"button"}
            >
              +
            </button>
          </div>

          <button
            className={
              "transition-all ease-in-out duration-300 bg-violet-600 text-white font-bold rounded-lg px-4" +
              " py-2 justify-self-end hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            }
            onClick={(event: ReactMouseEvent<HTMLButtonElement>) =>
              handleAddRating(event, index)
            }
            type={"button"}
          >
            Add Rating
          </button>

          <Dialog
            isOpen={templateSetterActive}
            onClose={() => setTemplateSetterActive(false)}
            title={
              "Add common criteria to a Template for faster building in the future!"
            }
          >
            {renderTemplateSetter()}
          </Dialog>
        </div>
      </div>
    );
  };

  return (
    <>
      {activeCriterionIndex === index
        ? renderDetailedView()
        : renderCondensedView()}
    </>
  );
}
