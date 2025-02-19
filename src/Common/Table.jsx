import React, { useState } from "react";
import PropTypes from "prop-types";

const Table = ({
  data,
  renderRow,
  renderExpandedRow,
  headers,
  rowsPerPage = 10,
  currentPage,
  setPage,
}) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleToggleExpand = (index) => {
    setExpandedRow((prevIndex) => {
      return prevIndex === index ? null : index;
    });
  };
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-[#008F8F]/50 text-primary font-semibold text-xs text-center">
            {headers.map((header, index) => (
              <th key={index} className="py-4 text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((rowData, index) => (
            <React.Fragment key={index}>
              <tr
                className={`hover:bg-[#F1F5F9] cursor-pointer text-center ${
                  expandedRow === index ? "bg-[#F1F5F9]" : ""
                }`}
              >
                {renderRow(rowData, index, handleToggleExpand, expandedRow)}
              </tr>
              {expandedRow === index && renderExpandedRow && (
                <tr className="bg-inherit">
                  <td colSpan="6" className="">
                    {renderExpandedRow(rowData)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="cursor-pointer"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="cursor-pointer"
          onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
// Prop validation for headers
Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderRow: PropTypes.func.isRequired,
  renderExpandedRow: PropTypes.func,
  rowsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  setPage: PropTypes.func,
};
export default Table;
