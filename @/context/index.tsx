import { createContext } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  openModal: () => void;
};

export const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
});
