import styles from "./ModalOverlay.module.css";

function ModalOverlay(props) {
  const closeModal = () => {
    props.close();
  };

  return (
    <>
      <div className={styles.modalOverlay} onClick={closeModal}>{props.children}</div>
    </>
  );
}

export default ModalOverlay;
