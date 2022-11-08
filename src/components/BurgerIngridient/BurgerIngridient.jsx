import React from "react";
import PropTypes from "prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";

import styles from "./BurgerIngridient.module.css";
import { dataPropTypes } from "../../utils/data";

class BurgerIngridient extends React.Component {
  render() {
    return (
      <li className={styles.container}>
        <img src={this.props.data.image} alt={this.props.data.name}></img>
        <div className={styles.priceContainer}>
          <p className="text text_type_digits-default">
            {this.props.data.price}
          </p>
          <CurrencyIcon />
        </div>
        <p>{this.props.data.name}</p>
        <Counter />
      </li>
    );
  }
}

BurgerIngridient.PropType = {
  data: dataPropTypes
};

export default BurgerIngridient;
