import { createContext, ReactNode, useContext, useState } from "react";
import { Assignment } from "palette-types";

interface AssignmentProviderProps {
  activeAssignment: Assignment | null;
  setActiveAssignment: (activeCourse: Assignment | null) => void;
}

const AssignmentContext = createContext<AssignmentProviderProps>({
  activeAssignment: null,
  setActiveAssignment: () => {},
});

export const useAssignment = () => useContext(AssignmentContext);

export const AssignmentProvider = ({ children }: { children: ReactNode }) => {
  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(
    null,
  );

  return (
    <AssignmentContext.Provider
      value={{
        activeAssignment: activeAssignment,
        setActiveAssignment: setActiveAssignment,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};
