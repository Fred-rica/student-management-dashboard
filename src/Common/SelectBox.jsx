import PropTypes from "prop-types";

const SelectBox = ({ value, onChange, options, label, className = "" }) => {
  return (
    <div className="flex items-center space-x-2 w-full">
      {label && (
        <label className="text-sm font-medium whitespace-nowrap">{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`border border-[#E2E8F0] p-2 rounded  text-sm outline-none cursor-pointer ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectBox.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SelectBox;
