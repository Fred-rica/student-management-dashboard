import PropTypes from "prop-types";
import { useStudentContext } from "../context/StudentContext";

const StudentApplications = ({ studentId }) => {
  const { getStudentApplications } = useStudentContext();
  const applications = getStudentApplications(studentId);

  return (
    <div className="p-4 border rounded-md">

      {applications.length > 0 ? (
        <ul className="mt-3">
          {applications.map((app) => (
            <li key={app.id} className="border-b py-2">
              <p>
                <strong>Program:</strong> {app.program}
              </p>
              <p>
                <strong>Status:</strong> {app.status}
              </p>
              <p>
                <strong>Date:</strong> {app.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-gray-600">No applications found.</p>
      )}
    </div>
  );
};

StudentApplications.propTypes = {
  studentId: PropTypes.number,
};
export default StudentApplications;
