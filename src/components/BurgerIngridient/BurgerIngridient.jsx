import React from "react";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";

import styles from "./BurgerIngridient.module.css";

class Ingridient extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <img src={this.props.data.image}></img>
        <div className={styles.priceContainer}>
          <p className="text text_type_digits-default">
            {this.props.data.price}
          </p>
          <CurrencyIcon />
        </div>
        <p>{this.props.data.name}</p>
        <Counter />
      </div>
    );
  }
}

export default Ingridient;
