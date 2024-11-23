/**
 * Rubric Builder view.
 */

import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import CriteriaInput from "../rubricBuilder/CriteriaInput.tsx";
import { Dialog, Footer, Header, ModalChoiceDialog, PopUp } from "@components";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useFetch } from "@hooks";
import { CSVRow } from "@local_types";

import { createCriterion, createRating, createRubric } from "@utils";
import { TemplateService } from "../../../../backend/src/TemplatesAPI/templateRequests.ts";
import {
  Criteria,
  PaletteAPIResponse,
  Rubric,
  PaletteAPIRequest,
  Template,
} from "palette-types";
import { AnimatePresence, motion } from "framer-motion";
import { useCourse } from "../../context";
import { NoCourseSelected } from "../../components/NoCourseSelected.tsx";
import { useAssignment } from "../../context/AssignmentProvider.tsx";
import { NoAssignmentSelected } from "../../components/NoAssignmentSelected.tsx";
import { LoadingDots } from "../../components/LoadingDots.tsx";
import { createTemplate } from "src/utils/templateFactory.ts";
import TemplateSetter from "../rubricBuilder/TemplateSetter.tsx";
import settingJson from "../../../../backend/settings.json";
import TemplateUpload from "../rubricBuilder/TemplateUpload.tsx";
import settingsJson from "../../../../backend/settings.json";
import TemplateCard from "./TemplateCards";

export default function RubricBuilder(): ReactElement {
  /**
   * Rubric Builder State
   */

  // active rubric being edited
  const [rubric, setRubric] = useState<Rubric | undefined>(undefined);
  // csv import modal
  const [fileInputActive, setFileInputActive] = useState(false);
  // tracks which criterion card is displaying the detailed view (limited to one at a time)
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(-1);

  const [activeCriterionIndex, setActiveCriterionIndex] = useState(-1);
  // result of hook checking if active assignment has an existing rubric
  const [hasExistingRubric, setHasExistingRubric] = useState(false);
  // flag for if loading component should be rendered
  const [loading, setLoading] = useState(false);
  // flag to determine if new rubric should be sent via POST or updated via PUT
  const [isNewRubric, setIsNewRubric] = useState(false);

  const [updatingTemplate, setUpdatingTemplate] = useState<Template | null>(
    null
  );
  const [userTemplates, setUserTemplates] = useState<Template[]>([]);

  const [templateInputActive, setTemplateInputActive] = useState(false);

  // declared before, so it's initialized for the modal initial state. memoized for performance
  const closeModal = useCallback(
    () => setModal((prevModal) => ({ ...prevModal, isOpen: false })),
    []
  );
  // object containing related modal state
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    choices: [] as { label: string; action: () => void }[],
  });

  const closePopUp = useCallback(
    () => setPopUp((prevPopUp) => ({ ...prevPopUp, isOpen: false })),
    []
  );

  const [popUp, setPopUp] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  /**
   * Active Course and Assignment State (Context)
   */
  const { activeCourse } = useCourse();
  const { activeAssignment } = useAssignment();

  /**
   * Custom fetch hooks provide a `fetchData` callback to send any type of fetch request.
   *
   * See PaletteAPIRequest for options structure.
   */

  // GET rubric from the active assignment.
  const { fetchData: getRubric } = useFetch(
    `/courses/${activeCourse?.id}/rubrics/${activeAssignment?.rubricId}`
  );

  useEffect(() => {
    if (!activeCourse || !activeAssignment) return;
    if (hasExistingRubric) handleExistingRubric();
    if (!hasExistingRubric) handleNewRubric();
  }, [hasExistingRubric]);

  /**
   * Updates active assignment with new or updated rubric.
   */
  const { fetchData: putRubric } = useFetch(
    `/courses/${activeCourse?.id}/rubrics/${activeAssignment?.rubricId}/${activeAssignment?.id}`,
    {
      method: "PUT",
      body: JSON.stringify(rubric),
    }
  );

  const { fetchData: postRubric } = useFetch(
    `/courses/${activeCourse?.id}/rubrics/${activeAssignment?.id}`,
    {
      method: "POST",
      body: JSON.stringify(rubric),
    }
  );

  /* this is for updating the existing templates with most 
  recent version of the criteria before saving the rubric
  in case any criterion are updated after intial template selection
  */
  const { fetchData: putTemplate } = useFetch("/templates", {
    method: "PUT",
    body: JSON.stringify(updatingTemplate),
  });

  /**
   * Fires when user selects an assignment that doesn't have a rubric id associated with it.
   */
  const handleNewRubric = () => {
    console.log("Active assignment doesn't have a rubric");
    const newRubric = createRubric();
    setRubric(newRubric);

    setModal({
      isOpen: true,
      title: "Build a New Rubric",
      message:
        "The active assignment does not have an associated rubric. Let's build one!",
      choices: [{ label: "OK", action: closeModal }],
    });
    setLoading(false);
    setHasExistingRubric(false);
    setIsNewRubric(true);
  };

  /**
   * Effect hook to see if the active assignment has an existing rubric. Apply loading status while waiting to
   * determine which view to render.
   */
  useEffect(() => {
    if (!activeCourse) {
      console.warn("Select a course before trying to fetch rubric");
      return;
    }

    if (!activeAssignment) {
      console.warn("Select a assignment before trying to fetch rubric");
      return;
    }

    setLoading(true);

    const checkRubricExists = async () => {
      console.log("checking existence:");
      console.log(activeAssignment);

      if (!activeAssignment.rubricId) {
        handleNewRubric();
        return;
      }

      const response = await getRubric();

      if (!response) {
        console.log("response is not good");
        setLoading(false);
        return;
      }
      setHasExistingRubric(response.success || false);
      setIsNewRubric(false);
      setRubric(response.data as Rubric);
      setLoading(false);
    };
    void checkRubricExists();
  }, [activeCourse, activeAssignment]);

  /**
   * Rubric change event handlers
   */

  /**
   * If user selects edit existing rubric, the program loads the rubric. When the user clicks "Save Rubric" the
   * program sends a PUT request to apply updates.
   */
  const editRubric = () => {
    closeModal();
  };

  /**
   * If user selects replace existing rubric, the program creates a new rubric for the user to edit.
   *
   * On "Save Rubric", the program sends a POST request to add the new rubric to the associated assignment on Canvas.
   */
  const startNewRubric = () => {
    closeModal();
    const newRubric = createRubric();
    setRubric(newRubric); // set the active rubric to a fresh rubric
  };

  /**
   * Fires when a selected assignment already has a rubric.
   *
   * User has the option to either overwrite the rubric with a fresh start or edit the existing rubric.
   */
  const handleExistingRubric = () => {
    if (!rubric) return;

    setModal({
      isOpen: true,
      title: "Existing Rubric Detected",
      message: `A rubric with the title "${rubric.title}" already exists for the active assignment. How would you like to proceed?`,
      choices: [
        { label: "Edit Rubric", action: () => editRubric() },
        { label: "Create New Rubric", action: () => startNewRubric() },
      ],
    });
  };

  const handleUpdateAllTemplateCriteria = async (): Promise<void> => {
    console.log("updating template criteria");
    console.log(rubric?.criteria);
    const criteriaOnATemplate: Criteria[] = [];
    rubric?.criteria.forEach((criterion) => {
      if (criterion.template !== "") criteriaOnATemplate.push(criterion);
    });

    let existingTemplates: Template[] = [];
    for (const criterion of criteriaOnATemplate) {
      const exitingTemplateIndex = existingTemplates.findIndex(
        (template) => template.key === criterion.template
      );
      if (exitingTemplateIndex === -1) {
        const template = createTemplate();
        template.key = criterion.template!;
        template.title = criterion.templateTitle!;
        template.criteria.push(criterion);
        existingTemplates.push(template);
      }
    }
    console.log("existing templates");
    console.log(existingTemplates);

    for (const template of existingTemplates) {
      setUpdatingTemplate(template);
      const response = await putTemplate();
      console.log("response", response);
      if (response.success) {
        console.log("template updated successfully");
      } else {
        console.error("error updating template", response.error);
      }
    }
  };

  const handleSumbitTemplate = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    console.log("submitting rubric");
    handleUpdateAllTemplateCriteria();
    if (!rubric || !activeCourse || !activeAssignment) return;

    setLoading(true);

    try {
      const response: PaletteAPIResponse<unknown> = isNewRubric
        ? await postRubric()
        : await putRubric();

      if (response.success) {
        setModal({
          isOpen: true,
          title: "Success!",
          message: `${rubric.title} ${isNewRubric ? "created" : "updated"}!`,
          choices: [{ label: "Radical", action: () => closeModal() }],
        });
      } else {
        setModal({
          isOpen: true,
          title: "Error!",
          message: `An error occurred: ${response.error || "Unknown error"}`,
          choices: [{ label: "Close", action: () => closeModal() }],
        });
      }
    } catch (error) {
      console.error("Error handling rubric submission:", error);
      setModal({
        isOpen: true,
        title: "Error!",
        message: `An unexpected error occurred: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
        choices: [{ label: "Close", action: () => closeModal() }],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRubricTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRubric((prevRubric) =>
      prevRubric ? { ...prevRubric, title: event.target.value } : createRubric()
    );
  };

  /**
   * Generates a set of the current criteria descriptions stored within the component state to use for checking
   * duplicate entries.
   */
  const buildCriteriaDescriptionSet = (clearedRubric: Rubric): Set<string> =>
    new Set(
      clearedRubric.criteria.map((criterion) =>
        criterion.description.trim().toLowerCase()
      )
    );

  /**
   * Calculate rubric max points whenever rubric criterion changes. Uses memoization to avoid re-rendering the
   * function everytime, improving performance.
   *
   * Defaults to 0 if no criterion is defined.
   */
  const maxPoints = useMemo(() => {
    if (!rubric) return;

    return (
      rubric.criteria.reduce(
        (sum, criterion) =>
          isNaN(criterion.points) ? sum : sum + criterion.points,
        0 // init sum to 0
      ) ?? 0 // fallback value if criterion is undefined
    );
  }, [rubric?.criteria]);

  // update rubric state with new list of criteria
  const handleAddCriteria = (event: MouseEvent) => {
    event.preventDefault();
    if (!rubric) return;
    const newCriteria = [...rubric.criteria, createCriterion()];
    setRubric({ ...rubric, criteria: newCriteria });
    setActiveTemplateIndex(newCriteria.length - 1);
  };

  const handleRemoveCriterion = (index: number) => {
    if (!rubric) return;
    const newCriteria = [...rubric.criteria];
    newCriteria.splice(index, 1); // remove the target criterion from the array
    setRubric({ ...rubric, criteria: newCriteria });
  };

  // update criterion at given index
  const handleUpdateCriterion = (index: number, criterion: Criteria) => {
    if (!rubric) return;
    const newCriteria = [...rubric.criteria];
    newCriteria[index] = criterion; // update the criterion with changes;
    setRubric({ ...rubric, criteria: newCriteria }); // update rubric to have new criteria
  };

  /**
   * CSV Import and Export Functionality
   * @param data - parsed csv data
   */

  // Update state with the new CSV/XLSX data
  const handleImportFile = (data: CSVRow[]) => {
    if (!rubric) return;

    const clearedRubric = { ...rubric, criteria: [] };
    setRubric(clearedRubric);

    const existingCriteriaDescriptions =
      buildCriteriaDescriptionSet(clearedRubric);

    const newCriteria = data
      .slice(1)
      .map((row) => {
        if (typeof row[0] !== "string" || !row[0].trim()) return null;
        if (existingCriteriaDescriptions.has(row[0].trim().toLowerCase()))
          return null;

        const criterion: Criteria = createCriterion(row[0], "", 0, []);
        for (let i = 1; i < row.length; i += 2) {
          const points = Number(row[i]);
          const description = row[i + 1] as string;
          if (description)
            criterion.ratings.push(createRating(points, description));
        }
        criterion.updatePoints();
        return criterion;
      })
      .filter(Boolean);

    setRubric(
      (prevRubric) =>
        ({
          ...(prevRubric ?? createRubric()),
          criteria: [...(prevRubric?.criteria ?? []), ...newCriteria],
        }) as Rubric
    );
  };

  const handleImportFilePress = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!fileInputActive) {
      setFileInputActive(true);
    }
  };

  const handleOpenTemplateImport = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!templateInputActive) {
      setTemplateInputActive(true);
    }
  };

  /**
   * Fires when a drag event ends, resorting the rubric criteria.
   * @param event - drag end event
   */
  const handleDragEnd = (event: DragEndEvent) => {
    if (!rubric) return;
    if (event.over) {
      const oldIndex = rubric.criteria.findIndex(
        (criterion) => criterion.key === event.active.id
      );
      const newIndex = rubric.criteria.findIndex(
        (criterion) => criterion.key === event.over!.id // assert not null for type safety
      );

      const updatedCriteria = [...rubric.criteria];
      const [movedCriterion] = updatedCriteria.splice(oldIndex, 1);
      updatedCriteria.splice(newIndex, 0, movedCriterion);

      setRubric({ ...rubric, criteria: updatedCriteria });
    }
  };

  const handleImportTemplate = (template: Template) => {
    console.log("import template");
    if (!rubric) return;

    const currentCriteria = rubric.criteria;
    const newCriteria = template.criteria;

    if (newCriteria.length === 0) {
      setPopUp({
        isOpen: true,
        title: "Oops!",
        message: `This template has no criteria`,
      });

      return;
    }

    // Split into unique and duplicate criteria
    const { unique, duplicates } = newCriteria.reduce(
      (acc, newCriterion) => {
        const isDuplicate = currentCriteria.some(
          (existingCriterion) =>
            existingCriterion.key.trim().toLowerCase() ===
            newCriterion.key.trim().toLowerCase()
        );

        if (isDuplicate) {
          acc.duplicates.push(newCriterion);
        } else {
          acc.unique.push(newCriterion);
        }

        return acc;
      },
      { unique: [] as Criteria[], duplicates: [] as Criteria[] }
    );

    // Log information about duplicates if any were found
    if (duplicates.length > 0) {
      console.log(
        `Found ${duplicates.length} duplicate criteria that were skipped:`,
        duplicates.map((c) => c.description)
      );
    }

    setRubric(
      (prevRubric) =>
        ({
          ...(prevRubric ?? createRubric()),
          criteria: [...(prevRubric?.criteria ?? []), ...unique],
        }) as Rubric
    );
  };

  /**
   * Render a card for each criterion in the active rubric.
   *
   * The Sortable Context wrapper allows the drag and drop to dynamically apply sorting. The Animate Presence wrapper
   * with the motion.div enable the transitions in and out.
   */
  const renderCriteriaCards = () => {
    if (!rubric) return;
    return (
      <SortableContext
        items={rubric.criteria.map((criterion) => criterion.key)}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence>
          {rubric.criteria.map((criterion, index) => (
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

  /**
   * Effect to load a default rubric if canvas api is bypassed
   */
  useEffect(() => {}, [rubric]);

  const handleRemoveTemplate = (index: number) => {
    if (!rubric) return;
    const newTemplates = [...userTemplates];
    newTemplates.splice(index, 1);
    setUserTemplates(newTemplates);
  };

  const handleUpdateTemplate = (index: number, template: Template) => {
    if (!rubric) return;
    const newTemplates = [...userTemplates];
    newTemplates[index] = template;
    setUserTemplates(newTemplates);
  };

  const renderUserTemplates = () => {
    const userTemplates = settingsJson.templates;

    if (!userTemplates) return;
    return (
      <SortableContext
        items={userTemplates.map((template) => template.key)}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence>
          {userTemplates.map((template, index) => (
            <motion.div
              key={template.key}
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
              <TemplateCard
                index={index}
                activeTemplateIndex={activeTemplateIndex}
                template={template as Template}
                handleTemplateUpdate={handleUpdateTemplate}
                removeTemplate={handleRemoveTemplate}
                setActiveTemplateIndex={setActiveTemplateIndex}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </SortableContext>
    );
  };

  /**
   * Helper function to consolidate conditional rendering in the JSX.
   */

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen justify-between flex flex-col w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
        {/* Sticky Header with Gradient */}
        <Header />
        <div className="mt-6 flex flex-col ">{renderUserTemplates()}</div>
        {/* ModalChoiceDialog */}
        <ModalChoiceDialog
          show={modal.isOpen}
          onHide={closeModal}
          title={modal.title}
          message={modal.message}
          choices={modal.choices}
        />
        <PopUp
          show={popUp.isOpen}
          onHide={closePopUp}
          title={popUp.title}
          message={popUp.message}
        />
        {/* Template Import Dialog */}
        <Dialog
          isOpen={templateInputActive}
          onClose={() => setTemplateInputActive(false)}
          title={"Import Template:"}
        >
          <TemplateUpload
            closeImportCard={() => setTemplateInputActive(false)}
            onTemplateSelected={handleImportTemplate}
          />
        </Dialog>
        {/* Sticky Footer with Gradient */}
        <Footer />
      </div>
    </DndContext>
  );
}
