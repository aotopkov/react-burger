import { FC, ReactNode } from "react";
import styles from "./ModalOverlay.module.css";

export interface IModal {
  close: () => void
  children: ReactNode
}


export const ModalOverlay: FC<IModal> = ({close, children}) => {
  const closeModal = (e: any) => {
    if (e.target.id === "modalOverlay") {
      close();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClickCapture={closeModal}
      id="modalOverlay"
    >
      {children}
    </div>
  );
}

export default ModalOverlay;
