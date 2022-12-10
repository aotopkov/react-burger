import { useMemo } from "react";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

import styles from "./BurgerConstructor.module.css";

import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

import { useSelector, useDispatch } from "react-redux";
import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_INGRIDIENT_TO_CONSTRUCTOR,
  CLOSE_ORDER_MODAL,
  setOrder,
} from "../../services/actions/actions";
import { useDrop } from "react-dnd";
import BurgerConstructorIngridient from "../BurgerConstructorIngridient/BurgerConstructorIngridient";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { v4 as uuidv4 } from "uuid";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.data.data);
  const orderData = useSelector((store) => store.order);

  const { bun, ingridients } = useSelector((store) => store.constructorBin);

  const totalPrice = useMemo(() => {
    if (bun && ingridients) {
      return (
        bun.price * 2 + ingridients.reduce((acc, elem) => acc + elem.price, 0)
      );
    } else if (bun) {
      return bun.price * 2;
    } else if (ingridients) {
      return ingridients.reduce((acc, elem) => acc + elem.price, 0);
    } else {
      return "0";
    }
  }, [bun, ingridients]);

  const idArr = useMemo(() => {
    let burgerId = [];
    if (bun && ingridients) {
      burgerId = burgerId.concat(bun._id);
      burgerId = burgerId.concat(
        ingridients.map((elem) => {
          return elem._id;
        })
      );
    } else if (ingridients) {
      burgerId = burgerId.concat(
        ingridients.map((elem) => {
          return elem._id;
        })
      );
    } else if (bun) {
      burgerId = burgerId.concat(bun._id);
    }
    return burgerId;
  }, [bun, ingridients]);

  // Drag&Drop

  const handleDropBun = (item) => {
    dispatch({
      type: ADD_BUN_TO_CONSTRUCTOR,
      payload: data.find((elem) => elem._id === item.id),
    });
  };

  const handleDropIngridient = (item) => {
    dispatch({
      type: ADD_INGRIDIENT_TO_CONSTRUCTOR,
      payload: data.find((elem) => elem._id === item.id),
      uuid: uuidv4(),
    });
  };

  const [, targetRefBun] = useDrop({
    accept: "bun",
    drop(item) {
      handleDropBun(item);
    },
  });

  const [, targetRefIngridient] = useDrop({
    accept: "ingridient",
    drop(item) {
      handleDropIngridient(item);
    },
  });

  // Модальные окна

  const openOrderModal = () => {
    dispatch(setOrder(idArr));
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };

  // Разметка

  return (
    <section className={styles.burgerConstructor} ref={targetRefBun}>
      {bun && (
        <div className="ml-8 mb-4 mr-2">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <ul className={styles.list} ref={targetRefIngridient}>
        {!ingridients.length && (
          <p className="text text_type_main-medium">
            Переместите ингридиенты сюда
          </p>
        )}
        {ingridients &&
          ingridients.map((elem, index) => {
            return (
              <BurgerConstructorIngridient
                elem={elem}
                index={index}
                key={elem.uuid}
              />
            );
          })}
      </ul>
      {bun && (
        <div className="ml-8 mt-4 mr-2">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

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
          disabled={!bun}
        >
          Оформить заказ
        </Button>
      </div>
      {orderData.orderRequest && (
        <ModalOverlay>
          <p className="text text_type_main-default">Отправляем данные</p>
        </ModalOverlay>
      )}
      {orderData.openModal && orderData.success && (
        <Modal close={closeModal}>
          <OrderDetails orderData={orderData}></OrderDetails>
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
