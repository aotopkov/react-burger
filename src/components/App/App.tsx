import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import data from "../../utils/data";
import PropTypes from "prop-types";

function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngridients data={data} />
        <BurgerConstructor
          data={data}
          bun={data.find((elem) => elem.type === "bun")}
        />
      </main>
    </div>
  );
}

export default App;
