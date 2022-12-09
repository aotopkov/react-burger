import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import BurgerIngridient from "../BurgerIngridient/BurgerIngridient";

import styles from "./BurgerIngridients.module.css";
import { dataPropTypes } from "../../utils/propTypes";

function BurgerIngridients() {
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

  const containerRef = useRef();
  const bunsRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const [viewTab, setViewTab] = useState({
    bunsIsView: true,
    sauceisView: false,
    mainisView: false,
  });

  let options = {
    root: containerRef.current,
    rootMargin: "0px",
    threshold: 0.2,
  };

  window.onload = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === bunsRef.current) {
            setViewTab({
              bunsIsView: true,
              sauceisView: false,
            });
          } else if (entry.target === sauceRef.current) {
            setViewTab({
              bunsIsView: false,
              sauceisView: true,
              mainisView: false,
            });
          } else if (entry.target === mainRef.current) {
            setViewTab({
              sauceisView: false,
              mainisView: true,
            });
          }
        }
      });
    }, options);

    observer.observe(bunsRef.current);
    observer.observe(sauceRef.current);
    observer.observe(mainRef.current);
  };

  return (
    <section className={styles.ingridients}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <ul className={styles.tabList}>
        <li>
          <Tab value="bun" active={viewTab.bunsIsView}>
            Булки
          </Tab>
        </li>
        <li>
          <Tab value="sauce" active={viewTab.sauceisView}>
            Соусы
          </Tab>
        </li>
        <li>
          <Tab value="main" active={viewTab.mainisView}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div className={styles.containerScroll} ref={containerRef}>
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
        <p className="text text_type_main-medium mt-10" ref={mainRef}>
          Начинки
        </p>
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
