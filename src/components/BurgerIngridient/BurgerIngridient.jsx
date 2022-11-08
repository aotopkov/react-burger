import React from "react";
import PropTypes from "prop-types";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";

import styles from "./BurgerIngridient.module.css";
import { dataPropTypes } from "../../utils/data";

function BurgerIngridient(props) {
    return (
      <li className={styles.container}>
        <img src={props.data.image} alt={props.data.name}></img>
        <div className={styles.priceContainer}>
          <p className="text text_type_digits-default">
            {props.data.price}
          </p>
          <CurrencyIcon />
        </div>
        <p>{props.data.name}</p>
        <Counter />
      </li>
    );
  }

BurgerIngridient.PropType = {
  data: dataPropTypes
};

export default BurgerIngridient;
