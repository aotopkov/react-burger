import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import BurgerIngridient from "../BurgerIngridient/BurgerIngridient";

import styles from "./BurgerIngridients.module.css";
import { dataPropTypes } from "../../utils/propTypes";

import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { CLOSE_MODAL_INGRIDIENT } from "../../services/actions/actions";

function BurgerIngridients() {
  const dispatch = useDispatch();
  const showModal = useSelector((store) => store.ingridient.openModal);
  const data = useSelector((store) => store.data.data);
  const bun = React.useMemo(
    () => data.filter((elem) => elem.type === "bun"),
    [data]
  );
  const sauce = React.useMemo(
    () => data.filter((elem) => elem.type === "sauce"),
    [data]
  );
  const main = React.useMemo(
    () => data.filter((elem) => elem.type === "main"),
    [data]
  );

  const { ref: bunsRef, inView: bunsVisible } = useInView();
  const { ref: sauceRef, inView: sauceVisible, entry } = useInView();
  const { ref: mainRef, inView: mainVisible } = useInView();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL_INGRIDIENT });
  };

  return (
    <section className={styles.ingridients}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <ul className={styles.tabList}>
        <li>
          <Tab value="bun" active={bunsVisible}>
            Булки
          </Tab>
        </li>
        <li>
          <Tab value="sauce" active={!bunsVisible && sauceVisible}>
            Соусы
          </Tab>
        </li>
        <li>
          <Tab value="main" active={mainVisible}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div className={styles.containerScroll}>
        <p className="text text_type_main-medium mt-10" ref={bunsRef}>
          Булки
        </p>
        <ul className={styles.listIngridients}>
          {bun.map((elem) => {
            return <BurgerIngridient data={elem} key={elem._id} />;
          })}
        </ul>
        <p className="text text_type_main-medium mt-10" ref={sauceRef}>
          Соусы
        </p>
        <ul className={styles.listIngridients}>
          {sauce.map((elem) => {
            return <BurgerIngridient data={elem} key={elem._id} />;
          })}
        </ul>
        <p className="text text_type_main-medium mt-10">Начинки</p>
        <ul className={styles.listIngridients} ref={mainRef}>
          {main.map((elem) => {
            return <BurgerIngridient data={elem} key={elem._id} />;
          })}
        </ul>
      </div>
      {showModal && (
        <Modal close={closeModal}>
          <IngredientDetails data={data} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngridients.propsType = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerIngridients;
