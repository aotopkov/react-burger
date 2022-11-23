import React from "react";
import PropTypes from "prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";

import styles from "./BurgerIngridient.module.css";
import { dataPropTypes } from "../../utils/propTypes";

import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function BurgerIngridient(props) {
  const [showModal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <li className={styles.container} onClick={openModal}>
      <img src={props.data.image} alt={props.data.name}></img>
      <div className={styles.priceContainer}>
        <p className="text text_type_digits-default">{props.data.price}</p>
        <CurrencyIcon />
      </div>
      <p>{props.data.name}</p>
      <Counter />
      {showModal && (
        <Modal close={closeModal}>
          <IngredientDetails data={props.data} />
        </Modal>
      )}
    </li>
  );
}

BurgerIngridient.PropType = {
  data: PropTypes.objectOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerIngridient;
