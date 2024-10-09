import { ReactElement } from "react";
import Criteria from "../Criteria.ts";
import Rubric from "../Rubric.ts";

interface WidgetProps {
  criterion: Criteria;
  index: number;
  rubric: Rubric;
  setRubric: (rubric: Rubric) => void;
}

const CriteriaWidget = ({
  criterion,
  index,
  rubric,
  setRubric,
}: WidgetProps): ReactElement => {
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
