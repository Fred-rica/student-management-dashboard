import { useState } from "react";
import { useStudentContext } from "../../context/StudentContext";

export default function useStudentTable() { 
const { deactivateStudent, getStudentApplications } = useStudentContext();
  const isMobile = window.innerWidth < 768;
  const headers = isMobile
    ? ["Name", "Status", " "]
    : ["Name", "Email", "Date of Birth", "Status", "Applications", " "];

  const [expandedRow, setExpandedRow] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [applications, setApplications] = useState([]);
  const[isApplicationsModalOpen, setIsApplicationsModalOpen]= useState(false)

  const openApplicationModal = (studentId) => {
    setSelectedStudentId(studentId);
    setApplications(getStudentApplications(studentId));
    setIsApplicationsModalOpen(true);
  };

  // const handleToggleExpand = (index) => {
  //   setExpandedRow(expandedRow === index ? null : index);
  // };

  // const handleToggleExpand = (rowIndex) => {
  //   console.log("Clicked row index:", rowIndex);
  //   setExpandedRow((prevIndex) => (prevIndex === rowIndex ? null : rowIndex));
  // };

const handleToggleExpand = (index) => {
  setExpandedRow((prevIndex) => {
    return prevIndex === index ? null : index;
  });
};


  const handleEllipsisClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };
  return {
    deactivateStudent,
    headers,
    isModalOpen,
    editingStudent,
    handleToggleExpand,
    handleEllipsisClick,
    handleEditClick,
    activeDropdown,
    expandedRow,
    setIsModalOpen,
    selectedStudentId,
    applications,
    openApplicationModal,
    isApplicationsModalOpen,
    setIsApplicationsModalOpen
  };
}