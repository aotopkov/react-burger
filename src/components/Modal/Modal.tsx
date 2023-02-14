import React, { FC } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay, { IModal } from "../ModalOverlay/ModalOverlay";

const modals: any = document.getElementById("modals");

export const Modal: FC<IModal> = ({ children, close }) => {
  const closeModal = () => {
    close();
  };

  function closeFromEsc(evt: any) {
    if (evt.key === "Escape") {
      closeModal();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", closeFromEsc);
    return () => {
      document.removeEventListener("keydown", closeFromEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay close={closeModal}>
      <div className={styles.modalContainer}>
        <button className={styles.btnExit} onClickCapture={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modals
  );
};

export default Modal;
