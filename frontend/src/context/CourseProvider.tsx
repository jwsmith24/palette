import { createContext, ReactNode, useContext, useState } from "react";
import { Course } from "palette-types";

interface CourseProviderProps {
  activeCourse: Course | null;
  setActiveCourse: (activeCourse: Course | null) => void;
}

const CourseContext = createContext<CourseProviderProps>({
  activeCourse: null,
  setActiveCourse: () => {},
});

export const useCourse = () => useContext(CourseContext);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  return (
    <CourseContext.Provider value={{ activeCourse, setActiveCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
