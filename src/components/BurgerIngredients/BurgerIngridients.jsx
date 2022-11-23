import React from "react";
import PropTypes from "prop-types";

import { DataContext } from "../../utils/DataContext";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import BurgerIngridient from "../BurgerIngridient/BurgerIngridient";

import styles from "./BurgerIngridients.module.css";
import { dataPropTypes } from "../../utils/propTypes";

function BurgerIngridients(props) {
  const { data } = React.useContext(DataContext);

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

  return (
    <section className={styles.ingridients}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <ul className={styles.tabList}>
        <li>
          <Tab value="bun" active>
            Булки
          </Tab>
        </li>
        <li>
          <Tab value="sauce">Соусы</Tab>
        </li>
        <li>
          <Tab value="main">Начинки</Tab>
        </li>
      </ul>
      <div className={styles.containerScroll}>
        <p className="text text_type_main-medium mt-10">Булки</p>
        <ul className={styles.listIngridients}>
          {bun.map((elem) => {
            return <BurgerIngridient data={elem} key={elem._id} />;
          })}
        </ul>
        <p className="text text_type_main-medium mt-10">Соусы</p>
        <ul className={styles.listIngridients}>
          {sauce.map((elem) => {
            return <BurgerIngridient data={elem} key={elem._id} />;
          })}
        </ul>
        <p className="text text_type_main-medium mt-10">Начинки</p>
        <ul className={styles.listIngridients}>
          {main.map((elem) => {
            return <BurgerIngridient data={elem} key={elem._id} />;
          })}
        </ul>
      </div>
    </section>
  );
}

BurgerIngridients.propsType = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerIngridients;
