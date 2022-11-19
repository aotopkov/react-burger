import React from "react";
import PropTypes from "prop-types";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

import styles from "./BurgerConstructor.module.css";

import { DataContext } from "../../utils/DataContext";
import { TotalPriceContext } from "../../utils/TotalPriceContext";

import { dataPropTypes } from "../../utils/data";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

function calcTotalPrice(state, action) {
  switch (action.type) {
    case "add" :
      return (state + action.price);
    case "remove" :
      return (state - action.price);
    default: 
     return state
  }
}

function BurgerConstructor(props) {

  const { data } = React.useContext(DataContext);
  const [totalPrice, changeTotalPrice] = React.useReducer(calcTotalPrice, '0')
  const bun = data.find((elem) => elem.type === "bun")
  const [showModal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChangeTotalPrice = (price) => {
    changeTotalPrice({type: 'add', payload: price})
  }

  return (
    <TotalPriceContext.Provider value = {{totalPrice, changeTotalPrice}}>
    <section className={styles.burgerConstructor}>
      <div className="ml-8 mb-4 mr-2">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          key={bun._id}
        />
      </div>
      <ul className={styles.list}>
        {data.map((elem) => {
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
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <div className={styles.totalContainer}>
        <div className={`mr-10 ${styles.totalDigits}`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary"></CurrencyIcon>
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="submit"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
      {showModal && (
        <Modal close={closeModal}>
          <OrderDetails data={data}></OrderDetails>
        </Modal>
      )}
    </section>
    </TotalPriceContext.Provider>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
  bun: dataPropTypes
};

export default BurgerConstructor;
