import PropTypes from "prop-types";
import InputBox from "../Common/InputBox";
import useAddStudentForm from "./hooks/useAddStudentForm";

const AddStudentForm = ({ setIsModalOpen, initialData, onStudentAdded }) => {
  const { formData, errors, handleChange, handleSubmit, addApplication } =
    useAddStudentForm(setIsModalOpen, initialData, onStudentAdded);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <InputBox
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          label="Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm text-left">{errors.name}</p>
        )}
      </div>

      <div>
        <InputBox
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          label="Email Address"
        />
        {errors.email && (
          <p className="text-red-500 text-sm text-left">{errors.email}</p>
        )}
      </div>

      <div>
        <InputBox
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          placeholder="yyyy-mm-dd"
          label="Date of Birth"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm text-left">{errors.dateOfBirth}</p>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-left">Applications</h3>
        {errors.applications && (
          <p className="text-red-500 text-sm text-left">{errors.applications}</p>
        )}
        {formData.applications.map((app, index) => (
          <div key={index} className="border p-2 rounded-md space-y-2">
            <InputBox
              type="text"
              name={`applications[${index}].program`}
              value={app.program}
              onChange={(e) => handleChange(e, index)}
              placeholder="Program Name"
              label="Program"
            />
            <InputBox
              type="date"
              name={`applications[${index}].date`}
              value={app.date}
              onChange={(e) => handleChange(e, index)}
              placeholder="yyyy-mm-dd"
              label="Application Date"
            />
            <select
              name={`applications[${index}].status`}
              value={app.status}
              onChange={(e) => handleChange(e, index)}
              className="w-full p-2 border rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={addApplication}
          className="bg-blue-500 text-white px-3 py-2 flex self-start rounded-md cursor-pointer"
        >
          Add Application
        </button>
      </div>

      <button
        type="submit"
        className="bg-[#0A2139] text-white px-4 py-2 rounded-md cursor-pointer"
      >
        {initialData ? "Update" : "Submit"}
      </button>
    </form>
  );
};

AddStudentForm.propTypes = {
  setIsModalOpen: PropTypes.func,
  onStudentAdded: PropTypes.func,
  initialData: PropTypes.object,
};

export default AddStudentForm;
