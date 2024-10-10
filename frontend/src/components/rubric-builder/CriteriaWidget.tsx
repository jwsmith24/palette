import { ReactElement } from "react";
import { CriteriaDisplayProps } from "../../interfaces/CriteriaDisplayProps.ts";

/*
CriteriaWidget is a simplified view of a given criteria that has already been saved to improve readability while the
 user is working on filling out other criteria or just wants a quick overview of what criteria make up a rubric.
 */
//todo: work in progress. need to actually wire things up
const CriteriaWidget = ({
  criterion,
  index,
  rubric,
  setRubric,
}: CriteriaDisplayProps): ReactElement => {
  return (
    <div className="border p-4 mb-2">
      <div id={"widgetInfo"} className={"grid"}>
        <p className="font-bold">{criterion.title}</p>
        <p>Points: {criterion.calculatePoints()}</p>
      </div>
    </div>
  );
};

export default CriteriaWidget;
