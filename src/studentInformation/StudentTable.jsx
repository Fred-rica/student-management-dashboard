import { Icons } from "../../src/Common/SvgIcons.jsx";
import Table from "../../src/Common/Table.jsx";
import PropTypes from "prop-types";
import Modal from "../../src/Common/Modal.jsx";
import AddStudentForm from "./AddStudentForm.jsx";
import useStudentTable from "./hooks/useStudentTable.js";
import StudentApplications from "./StudentApplications.jsx";

const StudentTable = ({ paginatedData, filterState, setPage }) => {
  const {
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
    setIsApplicationsModalOpen,
  } = useStudentTable();

  const renderRow = (rowData, index) => (
    <>
      <td className="py-4 px-0 md:px-4 flex items-center md:justify-center justify-start gap-1">
        <button
          type="button"
          className="focus:outline-none bg-primary inline-block lg:hidden"
          onClick={(e) => {
            e.stopPropagation();
            handleToggleExpand(index);
          }}
        >
          <Icons.arrow
            className={`stroke-[#0A2139] transition-transform duration-200 ${
              expandedRow === index ? "rotate-90" : "rotate-0"
            }`}
            width={20}
            height={20}
          />
        </button>
        {rowData.name}
      </td>
      <td className="p-2 hidden md:table-cell">{rowData.email}</td>
      <td className="p-2 hidden md:table-cell">{rowData.dateOfBirth}</td>
      <td className="p-2">{rowData.status}</td>
      <td className="p-2 hidden md:table-cell">
        {rowData.applications?.length|| 0}
      </td>
      <td className="p-2 relative cursor-pointer">
        <button
          onClick={() => handleEllipsisClick(index)}
          className="focus:outline-none cursor-pointer"
        >
          <Icons.elipsis strokeColor="#0A2139" width={20} height={20} />
        </button>
        

        {activeDropdown === index && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-40">
            <button
              onClick={() => handleEditClick(rowData)}
              className="w-full text-left px-4 py-2 hover:bg-[#0A2139] hover:text-white cursor-pointer"
            >
              Edit Details
            </button>
            {rowData?.status?.toLowerCase() === "active" && (
              <button
                onClick={() => deactivateStudent(rowData.id)}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-[#0A2139] hover:text-white cursor-pointer"
              >
                Deactivate
              </button>
            )}
            <button
              onClick={() => {
                openApplicationModal(rowData.id);
              }}
              className="hover:bg-[#0A2139] hover:text-white px-2 py-2 text-[#008F8F] cursor-pointer w-full"
            >
              View Applications
            </button>
          </div>
        )}
        <Modal
          isOpen={isApplicationsModalOpen}
          onClose={() => setIsApplicationsModalOpen(false)}
          title="Student Applications"
        >
          <StudentApplications
            onClose={() => setIsApplicationsModalOpen(false)}
            studentId={selectedStudentId}
            applications={applications}
          />
        </Modal>
      </td>
    </>
  );
 
const renderExpandedRow = (rowData) => {
  if (!rowData || typeof rowData !== "object") {
    return <div>No data available</div>;
  }

  return (
    <div className="text-left bg-[#008F8F]/10 p-4">
      <p>
        <strong>Email:</strong> {rowData.email || "N/A"}
      </p>
      <p>
        <strong>Date of birth:</strong> {rowData.dateOfBirth || "N/A"}
      </p>
      <p>
        <strong>Applications:</strong>{" "}
        {JSON.stringify(rowData.applications?.length || 0)}
      </p>
    </div>
  );
};


  return (
    <>
      <Table
        headers={headers}
        renderExpandedRow={renderExpandedRow}
        data={paginatedData}
        renderRow={renderRow}
        currentPage={filterState.page}
        setPage={setPage}
        expandedRow={expandedRow}
        handleToggleExpand={handleToggleExpand}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Student Details"
      >
        <AddStudentForm
          setIsModalOpen={setIsModalOpen}
          initialData={editingStudent}
        />
      </Modal>
    </>
  );
};

StudentTable.propTypes = {
  paginatedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterState: PropTypes.object,
  setPage: PropTypes.func,
};

export default StudentTable;
