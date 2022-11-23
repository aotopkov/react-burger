import PropTypes from 'prop-types'
import styles from "./ModalOverlay.module.css";

function ModalOverlay(props) {
  const closeModal = (e) => {
    if (e.target.id === "modalOverlay") {
      props.close();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClickCapture={closeModal}
      id="modalOverlay"
    >
      {props.children}
    </div>
  );
}

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export default ModalOverlay;
