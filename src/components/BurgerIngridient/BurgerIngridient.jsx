import PropTypes from "prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";

import styles from "./BurgerIngridient.module.css";
import { dataPropTypes } from "../../utils/propTypes";

import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_MODAL_INGRIDIENT,
  OPEN_MODAL_INGRIDIENT,
} from "../../services/actions/actions";
import { useDrag } from "react-dnd";

function BurgerIngridient({ data }) {
  const dispatch = useDispatch();
  const showModal = useSelector((store) => store.ingridient.openModal);
  const count = useSelector((store) => {
    if (data.type === "bun" && store.constructorBin.bun) {
      return store.constructorBin.bun._id === data._id ? "1" : false;
    }
    if (data.type !== "bun" && store.constructorBin.ingridients) {
      return store.constructorBin.ingridients.filter(
        (elem) => elem._id === data._id
      ).length;
    }
  });

  const openModal = () => {
    dispatch({ type: OPEN_MODAL_INGRIDIENT, payload: data });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL_INGRIDIENT });
  };

  const [, dragRef] = useDrag({
    type: data.type === "bun" ? "bun" : "ingridient",
    item: { id: data._id },
  });

  return (
    <li
      className={styles.container}
      onClick={openModal}
      draggable
      ref={dragRef}
    >
      <img src={data.image} alt={data.name}></img>
      <div className={styles.priceContainer}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon />
      </div>
      <p>{data.name}</p>
      {count >= 1 && <Counter count={count} />}
      {showModal && (
        <Modal close={closeModal}>
          <IngredientDetails data={data} />
        </Modal>
      )}
    </li>
  );
}

BurgerIngridient.PropType = {
  data: PropTypes.objectOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerIngridient;
