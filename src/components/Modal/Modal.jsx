import React from "react";
import PropTypes from 'prop-types'
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modals = document.getElementById("modals");

function Modal(props) {
  const closeModal = () => {
    props.close();
  };

  function closeFromEsc(evt) {
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
        {props.children}
      </div>
    </ModalOverlay>,
    modals
  );
}

Modal.propTypes={
  close: PropTypes.func,
}

export default Modal;
