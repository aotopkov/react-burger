import React from 'react'
import styles from './Modal.module.css'
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modals = document.getElementById("modals");


function Modal(props) {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
      setIsOpen(props.isOpen);
    }, [props.isOpen]);
  
    const closeModal = () => {
      props.close();
      setIsOpen(false);
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
        <>{isOpen && (<ModalOverlay close={closeModal}>
        <div className={styles.modalContainer}>
            <button className={styles.btnExit} onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
            {props.children}
          </div>
          </ModalOverlay>)}</>, modals
    )
}

export default Modal