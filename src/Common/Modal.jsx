import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="sticky top-0 bg-white flex justify-between items-center border-b p-4 z-10">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 text-4xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
