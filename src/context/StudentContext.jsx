import { createContext, useContext, useState } from "react";
import { studentData } from "../Data/StudentData";
import PropTypes from "prop-types";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(studentData);

  const addStudent = (student) => {
    setStudents((prevStudents) => {
      const existingIndex = prevStudents.findIndex((s) => s.id === student.id);

      if (existingIndex !== -1) {
        // Updates existing student
        const updatedStudents = [...prevStudents];
        updatedStudents[existingIndex] = {
          ...updatedStudents[existingIndex],
          ...student,
        };
        return updatedStudents;
      }

      // adds a new student to the list
      return [
        { ...student, id: crypto.randomUUID(), status: "Active" },
        ...prevStudents,
      ];
    });
  };

  // Soft deletes students renders their status inactive
  const deactivateStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, status: "Inactive" } : student
      )
    );
    alert("Student deactivated successfully!");
  };

  // Retrieves list with details of all applications made by a sudent
  const getStudentApplications = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student ? student.applications : [];
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        deactivateStudent,
        getStudentApplications,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  return useContext(StudentContext);
};

StudentProvider.propTypes = {
  children: PropTypes.node,
};
