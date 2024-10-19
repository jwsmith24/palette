/**
 * Wrapper for the criteria component to make it sortable with drag and drop functionality.
 */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactElement } from "react";
import CriteriaInput from "./CriteriaInput";
import { Criteria } from "../../models/types/criteria.ts";

export default function SortableCriteriaInput({
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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: criterion.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CriteriaInput
        index={index}
        activeCriterionIndex={activeCriterionIndex}
        criterion={criterion}
        handleCriteriaUpdate={handleCriteriaUpdate}
        removeCriterion={removeCriterion}
        setActiveCriterionIndex={setActiveCriterionIndex}
      />
    </div>
  );
}
