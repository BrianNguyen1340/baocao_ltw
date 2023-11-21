import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute top-[40%] right-[40%] bg-[#111] p-4 rounded-lg z-10 text-right">
            <button
              className="text-white font-semibold hover:text-gray-300 focus:outline-none mr-2"
              onClick={onClose}
            >
              <FaTimes />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
