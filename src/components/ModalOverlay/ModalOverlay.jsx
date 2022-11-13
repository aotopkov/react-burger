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

export default ModalOverlay;
