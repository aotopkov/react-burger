import React from "react";
import PropTypes from 'prop-types';

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

import styles from './BurgerConstructor.module.css';

import { dataPropTypes } from "../../utils/data";

class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className={styles.burgerConstructor}>
        <div className="ml-8 mb-4 mr-2">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${this.props.bun.name} (верх)`}
              price={this.props.bun.price}
              thumbnail={this.props.bun.image}
              key={this.props.bun._id}
            />
          </div>
        <ul className={styles.list}>
          {this.props.data.map((elem) => {
            if (elem.type !== "bun") {
              return (
                <li className={styles.listItem} key={elem._id}>
                  <DragIcon />
                  <ConstructorElement
                    text={elem.name}
                    price={elem.price}
                    thumbnail={elem.image}
                  />
                </li>
              );
            }
          })}
          </ul>
          <div className="ml-8 mt-4 mr-2">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${this.props.bun.name} (низ)`}
              price={this.props.bun.price}
              thumbnail={this.props.bun.image}
            />
          </div>
        
        <div className={styles.totalContainer}>
          <div className={`mr-10 ${styles.totalDigits}`}>
            <p className="text text_type_digits-medium">586</p>
            <CurrencyIcon type="primary"></CurrencyIcon>
          </div>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }

}

BurgerConstructor.propTypes = {
    elem: dataPropTypes
}



export default BurgerConstructor;

