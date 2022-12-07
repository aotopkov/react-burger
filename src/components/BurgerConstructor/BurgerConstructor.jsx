import React from "react";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

import styles from "./BurgerConstructor.module.css";

import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

import { useSelector, useDispatch } from "react-redux";
import { CLOSE_ORDER_MODAL, setOrder } from "../../services/actions/actions";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.data.data);
  const orderData = useSelector((store) => store.order);

  const bun = React.useMemo(
    () => data.find((elem) => elem.type === "bun"),
    [data]
  );
  const ingridients = React.useMemo(
    () => data.filter((elem) => elem.type !== "bun"),
    [data]
  );

  const totalPrice = React.useMemo(() => {
    return (
      bun.price * 2 + ingridients.reduce((acc, elem) => acc + elem.price, 0)
    );
  }, [bun, ingridients]);

  let burgerId = [bun._id];
  burgerId = burgerId.concat(
    ingridients.map((elem) => {
      return elem._id;
    }),
    bun._id
  );

  const openOrderModal = () => {
    dispatch(setOrder(burgerId));
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };

  return (
    <section className={styles.burgerConstructor}>
      <div className="ml-8 mb-4 mr-2">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={styles.list}>
        {ingridients.map((elem) => {
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
          onClick={openOrderModal}
        >
          Оформить заказ
        </Button>
      </div>
      {orderData.openModal && orderData.success && (
        <Modal close={closeModal}>
          <OrderDetails orderData={orderData}></OrderDetails>
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
