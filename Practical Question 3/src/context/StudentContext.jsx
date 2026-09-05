import { createContext, useContext, useState } from "react";

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [student] = useState({
    name: "Rahul",
    course: "BCA",
    college: "ABC College"
  });

  return (
    <StudentContext.Provider value={student}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudent must be used inside StudentProvider");
  }

  return context;
}
