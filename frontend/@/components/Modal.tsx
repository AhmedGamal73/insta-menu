import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  const variants = {
    open: { y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    closed: { y: "100%" },
  };

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      initial="closed"
      className="flex items-end flex-end h-full fixed inset-0 top-0 bg-black bg-opacity-10 z-50 w-full overflow-hidden"
      variants={variants}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 h-[90vh] w-full bottom-0 rounded-t-lg bg-white shadow-md overflow-y-auto scrollbar-hide pb-8"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Modal;
