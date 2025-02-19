import { createContext, useContext, useState } from "react";
import { studentData } from "../Data/StudentData"; 
import PropTypes from "prop-types";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(studentData); 

  // const addStudent = (student) => {
  //   setStudents((prevStudents) => {
  //     const updatedList = [
  //       ...prevStudents,
  //       { id: prevStudents.length + 1, ...student },
  //     ];
  //     return updatedList;
  //   });
  // };
  
    const addStudent = (student) => {
  setStudents((prevStudents) => {
    const existingIndex = prevStudents.findIndex((s) => s.id === student.id);

    

    if (existingIndex !== -1) {
      // Update existing student (including status change)
      const updatedStudents = [...prevStudents];
      updatedStudents[existingIndex] = { ...updatedStudents[existingIndex], ...student };
      return updatedStudents;
    }

    // If student is new, add it
    return [...prevStudents, { ...student, id: Date.now(), status: "Active" }];
  });
    };

const deactivateStudent = (id) => {
  setStudents((prevStudents) =>
    prevStudents.map((student) =>
      student.id === id ? { ...student, status: "Inactive" } : student
    )
  );
  alert("Student deactivated successfully!");
};
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
