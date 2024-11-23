import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import CriteriaInput from "../rubricBuilder/CriteriaInput.tsx";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"; // Import useSortable
import { CSS } from "@dnd-kit/utilities"; // Import CSS utilities
import { Criteria, Rating, Template } from "palette-types";
import { createCriterion, createRating } from "@utils";
import { createTemplate } from "../../utils/templateFactory.ts";
import RatingInput from "@features/rubricBuilder/RatingInput";
import TemplateSetter from "@features/rubricBuilder/TemplateSetter";
import { Dialog } from "../../components/Dialog";
import { AnimatePresence, motion } from "framer-motion";
import CSVExport from "@features/rubricBuilder/CSVExport";
import CSVUpload from "@features/rubricBuilder/CSVUpload";

export default function TemplateCard({
  index,
  activeTemplateIndex,
  template,
  handleTemplateUpdate,
  removeTemplate,
  setActiveTemplateIndex,
}: {
  index: number;
  activeTemplateIndex: number;
  template: Template;
  handleTemplateUpdate: (index: number, template: Template) => void;
  removeTemplate: (index: number) => void;
  setActiveTemplateIndex: (index: number) => void;
}): ReactElement {
  const [maxPoints, setMaxPoints] = useState<number>(0); // Initialize state for max points
  const [templateSetterActive, setTemplateSetterActive] = useState(false); // file input display is open or not
  const [templateTitle, setTemplateTitle] = useState(template.title || "");
  // tracks which criterion card is displaying the detailed view (limited to one at a time)
  const [activeCriterionIndex, setActiveCriterionIndex] = useState(-1);
  const [currentTemplate, setCurrentTemplate] = useState<Template>(
    createTemplate() || null
  );
  const [fileInputActive, setFileInputActive] = useState(false);

  /**
   * Whenever ratings change, recalculate criterion's max points
   */
  useEffect(() => {
    if (!template) return;
    const maxPoints = template.criteria.reduce((acc, criterion) => {
      return acc + criterion.ratings.length;
    }, 0);
    setMaxPoints(maxPoints);
  }, [currentTemplate]);

  /**
   * useEffect hook to ghost the add ratings button when 4 ratings are rendered.
   *
   * Related button styles and state.
   */
  const addButtonActiveStyle =
    "transition-all ease-in-out duration-300 bg-violet-600 text-white font-bold rounded-lg px-4" +
    " py-2 justify-self-end hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:outline-none";

  const addButtonInactiveStyle =
    "transition-all ease-in-out duration-300 bg-violet-200 text-violet-600 font-bold rounded-lg px-4" +
    " py-2 justify-self-end hover:bg-violet-300 focus:ring-2 focus:ring-violet-500 focus:outline-none opacity-50 cursor-not-allowed";

  /**
   * Criteria change functionality.
   */

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTemplateTitle(newTitle);

    const newTemplate = { ...template, title: newTitle };
    handleTemplateUpdate(index, newTemplate);
  };

  const handleRemoveTemplateButton = (
    event: ReactMouseEvent,
    index: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    removeTemplate(index);
  };

  const handleExpandTemplate = () => {
    setActiveTemplateIndex(index);
  };

  const handleTemplateSetterPress = (
    event: ReactMouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!templateSetterActive) {
      setTemplateSetterActive(true);
    }
  };

  const handleCloseTemplateSetter = () => {
    setTemplateSetterActive(false); // hides the template setter
  };

  // update rubric state with new list of criteria
  const handleAddCriteria = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!template) return;
    const newCriteria = [...template.criteria, createCriterion()];
    setCurrentTemplate({ ...template, criteria: newCriteria });
    handleTemplateUpdate(index, { ...template, criteria: newCriteria });
    setActiveCriterionIndex(newCriteria.length - 1);
  };

  const handleRemoveCriterion = (index: number) => {
    if (!template) return;
    const newCriteria = [...template.criteria];
    newCriteria.splice(index, 1); // remove the target criterion from the array
    handleTemplateUpdate(index, { ...template, criteria: newCriteria });
  };

  // update criterion at given index
  const handleUpdateCriterion = (index: number, criterion: Criteria) => {
    if (!template) return;
    const newCriteria = [...template.criteria];
    newCriteria[index] = criterion; // update the criterion with changes;

    handleTemplateUpdate(index, { ...template, criteria: newCriteria }); // update rubric to have new criteria
  };

  // Use the useSortable hook to handle criteria ordering
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: template.key,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderCriteriaCards = () => {
    if (!template) return;
    return (
      <SortableContext
        items={template.criteria.map((criterion) => criterion.key)}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence>
          {template.criteria.map((criterion, index) => (
            <motion.div
              key={criterion.key}
              initial={{
                opacity: 0,
                y: 50,
              }} // Starting state (entry animation)
              animate={{
                opacity: 1,
                y: 0,
              }} // Animate to this state when in the DOM
              exit={{ opacity: 0, x: 50 }} // Ending state (exit animation)
              transition={{ duration: 0.3 }} // Controls the duration of the animations
              className="my-1"
            >
              <CriteriaInput
                index={index}
                activeCriterionIndex={activeCriterionIndex}
                criterion={criterion}
                handleCriteriaUpdate={handleUpdateCriterion}
                removeCriterion={handleRemoveCriterion}
                setActiveCriterionIndex={setActiveCriterionIndex}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </SortableContext>
    );
  };

  const handleImportFilePress = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!fileInputActive) {
      setFileInputActive(true);
    }
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
        onDoubleClick={handleExpandTemplate}
      >
        <div className="text-gray-300">
          <strong>{templateTitle}</strong> - Max Points: {maxPoints}
        </div>
        <div className={"flex gap-3"}>
          <button
            onPointerDown={(
              event: ReactMouseEvent // Change to onPointerDown
            ) => handleRemoveTemplateButton(event, index)}
            type={"button"}
            className="transition-all ease-in-out duration-300 bg-red-600 text-white font-bold rounded-lg px-2 py-1 hover:bg-red-700 focus:outline-none border-2 border-transparent"
          >
            Remove
          </button>
          <button
            onPointerDown={handleExpandTemplate}
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
      <form
        className="h-full self-center grid p-10 w-full max-w-3xl my-6 gap-6 bg-gray-800 shadow-lg rounded-lg"
        onSubmit={(event) => event.preventDefault()}
      >
        <h1 className="font-extrabold text-5xl mb-2 text-center">
          {templateTitle}
        </h1>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold bg-green-600 text-black py-2 px-4 rounded-lg">
            {maxPoints} {maxPoints === 1 ? "Point" : "Points"}
          </h2>
        </div>

        <div className="mt-6 flex flex-col gap-3 h-[35vh] max-h-[50vh] overflow-y-auto overflow-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
          {renderCriteriaCards()}
        </div>

        <div className="grid gap-4 mt-6">
          <button
            className="transition-all ease-in-out duration-300 bg-blue-600 text-white font-bold rounded-lg py-2 px-4
                     hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleAddCriteria}
            type={"button"}
          >
            Add Criteria
          </button>
          <button
            className="transition-all ease-in-out duration-300 bg-green-600 text-white font-bold rounded-lg py-2 px-4
                     hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
            // onClick={(event) => void handleSubmitRubric(event)}
            type={"button"}
          >
            Save Template
          </button>
        </div>
      </form>
    );
  };

  return (
    <>
      {activeTemplateIndex === index
        ? renderDetailedView()
        : renderCondensedView()}
    </>
  );
}
