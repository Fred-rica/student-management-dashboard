import PropTypes from "prop-types";

const InputBox = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  label,
  name,
}) => {
  return (
    <div className={` w-full ${className} space-y-2`}>
      {label && (
        <label className="text-sm flex justify-start font-medium whitespace-nowrap">
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="border border-[#E2E8F0] p-2 rounded w-full placeholder-[#CBD5E1] font-normal text-sm outline-none"
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};
InputBox.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default InputBox;
