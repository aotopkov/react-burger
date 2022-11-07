import React from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import Ingridient from "../BurgerIngridient/BurgerIngridient";

import styles from "./BurgerIngridients.module.css";

class BurgerIngridients extends React.Component {
  state = {};
  render() {
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
            {this.props.data.map((elem) => {
              if (elem.type === "bun") {
                return (
                  <li>
                    <Ingridient data={elem} />
                  </li>
                );
              }
            })}
          </ul>
          <p className="text text_type_main-medium mt-10">Соусы</p>
          <ul className={styles.listIngridients}>
            {this.props.data.map((elem) => {
              if (elem.type === "sauce") {
                return (
                  <li>
                    <Ingridient data={elem} />
                  </li>
                );
              }
            })}
          </ul>
          <p className="text text_type_main-medium mt-10">Начинки</p>
          <ul className={styles.listIngridients}>
            {this.props.data.map((elem) => {
              if (elem.type === "main") {
                return (
                  <li>
                    <Ingridient data={elem} />
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default BurgerIngridients;
