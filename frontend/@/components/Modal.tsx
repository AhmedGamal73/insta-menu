import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "100%" },
  };

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      initial="closed"
      className="flex items-end flex-end bg-transparent h-full fixed inset-0 top-0"
      variants={variants}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 h-[85vh] w-full bottom-0 rounded-t-lg bg-white overflow-y-"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Modal;
