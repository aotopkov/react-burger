import React, { FC } from "react";
import { useSelector } from "../../services/types/hooks";

import { useInView } from "react-intersection-observer";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import BurgerIngridient from "../BurgerIngridient/BurgerIngridient";

import styles from "./BurgerIngridients.module.css";
import { Link, useLocation } from "react-router-dom";
import { TIngridient } from "../../services/types/data";

const BurgerIngridients: FC = () => {
  const location = useLocation();
  const data = useSelector((store) => store.data.data);
  const bun = React.useMemo(
    () => data.filter((elem: TIngridient) => elem.type === "bun"),
    [data]
  );
  const sauce = React.useMemo(
    () => data.filter((elem: TIngridient) => elem.type === "sauce"),
    [data]
  );
  const main = React.useMemo(
    () => data.filter((elem: TIngridient) => elem.type === "main"),
    [data]
  );

  const { ref: bunsRef, inView: bunsVisible } = useInView();
  const { ref: sauceRef, inView: sauceVisible } = useInView();
  const { ref: mainRef, inView: mainVisible } = useInView();

  return (
    <section className={styles.ingridients}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <ul className={styles.tabList}>
        <li>
          <Tab value="bun" active={bunsVisible} onClick={() => {}}>
            Булки
          </Tab>
        </li>
        <li>
          <Tab
            value="sauce"
            active={!bunsVisible && sauceVisible}
            onClick={() => {}}
          >
            Соусы
          </Tab>
        </li>
        <li>
          <Tab value="main" active={mainVisible} onClick={() => {}}>
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
            return (
              <Link
                key={elem._id}
                className={styles.link}
                to={{
                  pathname: `/ingridient/${elem._id}`,
                  state: { background: location },
                }}
              >
                <BurgerIngridient data={elem} />
              </Link>
            );
          })}
        </ul>
        <p className="text text_type_main-medium mt-10" ref={sauceRef}>
          Соусы
        </p>
        <ul className={styles.listIngridients}>
          {sauce.map((elem) => {
            return (
              <Link
                key={elem._id}
                className={styles.link}
                to={{
                  pathname: `/ingridient/${elem._id}`,
                  state: { background: location },
                }}
              >
                <BurgerIngridient data={elem} />
              </Link>
            );
          })}
        </ul>
        <p className="text text_type_main-medium mt-10">Начинки</p>
        <ul className={styles.listIngridients} ref={mainRef}>
          {main.map((elem) => {
            return (
              <Link
                key={elem._id}
                className={styles.link}
                to={{
                  pathname: `/ingridient/${elem._id}`,
                  state: { background: location },
                }}
              >
                <BurgerIngridient data={elem} />
              </Link>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngridients;
