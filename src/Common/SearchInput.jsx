
import PropTypes from "prop-types";
import { Icons } from "./SvgIcons";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Enter Search term",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="border border-[#E2E8F0] p-2 rounded w-full pl-10  placeholder-[#CBD5E1] font-normal text-sm outline-none"
        value={value}
        onChange={onChange}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Icons.search
          width={20}
          height={20}
          className="stroke-[#94A3B8]"
        />
      </div>
    </div>
  );
};
SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SearchInput;
