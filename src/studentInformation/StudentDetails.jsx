import StudentTable from "./StudentTable";
import SearchInput from "../Common/SearchInput";
import SelectBox from "../Common/SelectBox";
import { downloadCSV } from "../utils/downloadCSV.js";
import { Icons } from "../Common/SvgIcons";
import Modal from "../Common/Modal";
import AddStudentForm from "./AddStudentForm";
import useStudentDetails from "./hooks/useStudentDetails.js"
import BulkUploadStudents from "./BulkUploadStudents.jsx";
 

const StudentDetails = () => {
  const {
    students,
    searchOptions,
    filterState,
    setFilters,
    handleFilter,
    handleClear,
    setPage,
    isModalOpen,
    setIsModalOpen,
  } = useStudentDetails();
 

  return (
    <>
      <div className="w-full  mb-4 border-gray-200 bg-gray-50 border p-3">
        <h1 className="text-sm md:text-3xl mb-5 font-semibold text-black">
          {" "}
          Student Profile Management dashboard
        </h1>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#008F8F] text-white md:px-4 px-1 py-2  rounded-md cursor-pointer"
          >
            Add a new Student
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add a new student"
          >
            <AddStudentForm setIsModalOpen={setIsModalOpen} />
          </Modal>

          <BulkUploadStudents />
        </div>
      </div>
      <div className="md:flex md:gap-10 space-y-4 md:space-y-0 w-full  bg-gray-50 p-4">
        <SelectBox
          label={"Search by"}
          value={filterState.searchBy}
          onChange={(e) =>
            setFilters({ field: "searchBy", value: e.target.value })
          }
          options={searchOptions}
          className="w-full"
        />
        <SearchInput
          value={filterState.searchString}
          onChange={(e) =>
            setFilters({ field: "searchString", value: e.target.value })
          }
        />
        <div className="flex gap-6">
          <button
            onClick={handleFilter}
            className="cursor-pointer bg-[#008F8F] text-white py-2 px-4 rounded"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="cursor-pointer bg-gray-400 text-white py-2 px-4 rounded"
          >
            Reset
          </button>
          <button
            onClick={() => downloadCSV(students)}
            className="cursor-pointer bg-[#0A2139] text-white py-2 px-4 rounded flex items-center gap-1"
          >
            <Icons.downloadIcon
              strokeColor="white"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            Export
          </button>
        </div>
      </div>
 
        <StudentTable
          paginatedData={students}
          filterState={filterState}
          setPage={setPage}
        />
    </>
  );
};

export default StudentDetails;
