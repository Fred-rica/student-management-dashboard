import { useEffect, useReducer, useState, useCallback } from "react";
import {useStudentContext} from "/src/context/StudentContext.jsx"

export default function useStudentDetails() {
  const { students, setStudents } = useStudentContext();
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Searchby Options
  const searchOptions = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
  ];

  const initialState = {
    page:1,
    searchString: "",
    searchBy: "name",
    Export: false,
  };

  const queryReducer = (state, action) => {
    switch (action.type) {
      case "SET_FILTER":
        return { ...state, [action.payload.field]: action.payload.value };
      case "SET_PAGE":
        return { ...state, page: action.payload };
      case "RESET_FILTERS":
        return initialState;
      default:
        return state;
    }
  };

  const [filterState, dispatch] = useReducer(queryReducer, initialState);
  const [query, setQuery] = useState(() => ({ ...filterState }));

  const setPage = (newPage) => {
    dispatch({ type: "SET_PAGE", payload: newPage });
  };
  const setFilters = useCallback((payload) => {
    dispatch({ type: "SET_FILTER", payload });
  }, []);

  const handleFilter = useCallback(() => {
    setQuery(filterState);
   dispatch({ type: "SET_PAGE", payload: 1 });
  }, [filterState]);

  const handleClear = () => {
    dispatch({ type: "RESET_FILTERS" });
    setQuery(initialState);
  };

  const fetchStudentData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(students);
      }, 1000);
    });
  };

  useEffect(() => {
    fetchStudentData().then((response) => {
      setStudents(response);
      setLoading(false);
    });
  }, []);

  // searches through list of student based on determined parameters
  useEffect(() => {
    if (!query.searchString) {
      setFilteredStudents(students);
      return;
    }

    const filtered = students.filter((student) =>
      student[query.searchBy]
        ?.toLowerCase()
        .includes(query.searchString.toLowerCase())
    );

    setFilteredStudents(filtered);
  }, [query, students]);

  return {
    students: filteredStudents,
    loading,
    searchOptions,
    filterState,
    setFilters,
    handleFilter,
    handleClear,
    setPage,
    isModalOpen,
    setIsModalOpen,
  };
}
