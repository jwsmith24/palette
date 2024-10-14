/*
Main view for the Rubric Builder feature.
 */

import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import Criteria from "../../Criteria.ts";
import CriteriaInput from "../rubric-builder/CriteriaInput.tsx";
import Rubric from "../../Rubric.ts";
import Dialog from "../util/Dialog.tsx";
import CSVUpload from "../home/CSVUpload.tsx";

export default function RubricBuilder(): ReactElement {
  const [rubric, setRubric] = useState<Rubric>(new Rubric()); // track state for whole rubric
  const [title, setTitle] = useState<string>(""); // track state for rubric title input
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [rubricData, setRubricData] = useState<string[]>([]); // Store CSV data here

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const handleRubricTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  useEffect(() => {
    calculateTotalPoints();
  }, [rubric]);

  // send the Rubric object to the server with the latest state values
  const handleSaveRubric = (event: MouseEvent) => {
    event.preventDefault();
    const jsonString = JSON.stringify(rubric, null, 2);

    //   placeholder: open dialog with json
    openDialog();
  };

  // Update state with the new CSV data
  const handleRubricDataChange = (data: string[]) => {
    setRubricData(data);
  };

  const calculateTotalPoints = () => {
    const total: number = rubric.criteria.reduce(
      (sum: number, criterion: Criteria) => {
        return sum + criterion.getMaxPoints();
      },
      0,
    ); // Initialize sum as 0
    setTotalPoints(total); // Update state with the total points
  };

  // update rubric state with new list of criteria
  const handleAddCriteria = (event: MouseEvent) => {
    event.preventDefault();
    const newCriteria = [...rubric.criteria, new Criteria()];
    // @ts-ignore
    setRubric({ ...rubric, criteria: newCriteria });
  };

  const handleRemoveCriterion = (index: number) => {
    const newCriteria = [...rubric.criteria];
    newCriteria.splice(index, 1); // remove the target criterion
    console.log(newCriteria);
    // @ts-ignore
    setRubric({ ...rubric, criteria: newCriteria });
  };

  // update criterion at given index
  const handleCriterionUpdate = (index: number, criterion: Criteria) => {
    const newCriteria = [...rubric.criteria]; // copy criteria to new array
    newCriteria[index] = criterion; // update the criterion with changes;
    // @ts-ignore
    setRubric({ ...rubric, criteria: newCriteria }); // update rubric to have new criteria
  };

  // render either the edit or widget view
  const renderCriteria = () => {
    return rubric.criteria.map((criterion: Criteria, index: number) => (
      <CriteriaInput
        key={criterion.id}
        index={index}
        criterion={criterion}
        handleCriteriaUpdate={handleCriterionUpdate}
        removeCriterion={handleRemoveCriterion}
      />
    ));
  };

  const fakeRubrics = [
    "critiquing bird noises",
    "building a dungeon crawler",
    "figuring out what gRPC is",
    "canceling AWS before it charges your card",
    "SELECTing everything",
  ];
  const selectPlaceHolder = () => {
    return fakeRubrics[Math.floor(Math.random() * fakeRubrics.length)];
  };
  const [placeholder, setPlaceholder] = useState("");
  // This effect runs once when the component mounts and then only if the title field changes to keep it from
  // going all crazy when a re-render occurs
  useEffect(() => {
    if (!title) {
      setPlaceholder(selectPlaceHolder());
    }
  }, [title]);

  return (
    <div className="min-h-screen w-screen bg-gray-800 text-white font-sans">
      {/* Sticky Header with Gradient */}
      <div className="bg-gradient-to-r from-red-500 via-green-500 to-purple-500 h-8 sticky top-0"></div>

      {/* Form Section */}
      <form className="grid p-8 w-full max-w-2xl mx-auto gap-4">
        {/* Main Heading */}
        <h1 className="font-bold text-5xl mb-2">Create a new rubric for</h1>
        <h2 className="font-medium italic text-3xl mb-4">
          {title || placeholder}
        </h2>
        <h2 className={"justify-self-end text-2xl font-extrabold"}>
          {totalPoints} Points
        </h2>

        {/* Rubric Title Input */}
        <label htmlFor="rubricTitle" className="mb-2">
          Rubric Title
        </label>
        <input
          type="text"
          placeholder="Task: Description"
          className="rounded p-2 mb-2 hover:bg-gray-200 focus:outline-0 text-gray-600 w-full"
          name="rubricTitle"
          id="rubricTitle"
          value={title}
          onChange={handleRubricTitleChange}
        />
        {/* CSV Upload Section */}
        <CSVUpload onDataChange={handleRubricDataChange} />

        {rubricData.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Uploaded Rubric Data</h2>
            <ul>
              {rubricData.map((row, index) => (
                <li key={index} className="border-b py-2">
                  {row}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Criteria Section */}
        <div className="mt-4 grid gap-6">{renderCriteria()}</div>

        {/*Buttons*/}
        <div className={"grid gap-3"}>
          <button
            className={
              " transition-all ease-in-out duration-300 bg-gray-200 text-black font-bold rounded-lg px-2" +
              " hover:bg-blue-500 hover:text-white hover:scale-105 focus:outline-0 focus:bg-blue-500"
            }
            onClick={handleAddCriteria}
          >
            Add Criteria
          </button>
          <button
            className={
              " transition-all ease-in-out duration-300 bg-gray-200 text-black font-bold rounded-lg px-2" +
              " hover:bg-green-500 hover:text-white hover:scale-105 focus:outline-0 focus:bg-green-500"
            }
            onClick={handleSaveRubric}
          >
            Save Rubric
          </button>
        </div>
      </form>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={"Sending Rubric!"}
      >
        <pre className="text-black bg-gray-100 p-4 rounded-lg max-h-96 overflow-auto">
          {JSON.stringify(rubric, null, 2)}
        </pre>
      </Dialog>
    </div>
  );
}
