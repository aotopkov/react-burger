import { FC, useMemo } from "react";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

import styles from "./BurgerConstructor.module.css";

import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

import { useSelector, useDispatch } from "../../services/types/hooks";
import {
  CLOSE_ORDER_MODAL,
  setOrder,
  addBunToConstructor,
  addIngridientToConstructor,
} from "../../services/actions/order";
import { useDrop } from "react-dnd";
import BurgerConstructorIngridient from "../BurgerConstructorIngridient/BurgerConstructorIngridient";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";
import { TIngridient } from "../../services/types/data";
import { TOrderSet } from "../../services/reducers/order";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.data.data);
  const orderData: TOrderSet = useSelector((store) => store.order);
  const userData = useSelector((store) => store.userData);
  const history = useHistory();

  const { bun, ingridients } = useSelector((store) => store.constructorBin);

  const totalPrice = useMemo(() => {
    if (bun && ingridients) {
      return (
        bun.price * 2 + ingridients.reduce((acc: number, elem: TIngridient) => acc + elem.price, 0)
      );
    } else if (bun) {
      return bun.price * 2;
    } else if (ingridients) {
      return ingridients.reduce((acc: number, elem: TIngridient) => acc + elem.price, 0);
    } else {
      return "0";
    }
  }, [bun, ingridients]);

  const idArr = useMemo(() => {
    let burgerId: string[] = [];
    if (bun && ingridients) {
      burgerId = burgerId.concat(bun._id);
      burgerId = burgerId.concat(
        ingridients.map((elem: TIngridient) => {
          return elem._id;
        })
      );
    } else if (ingridients) {
      burgerId = burgerId.concat(
        ingridients.map((elem: TIngridient) => {
          return elem._id;
        })
      );
    } else if (bun) {
      burgerId = burgerId.concat(bun._id);
    }
    return burgerId;
  }, [bun, ingridients]);

  // Drag&Drop

  const [, targetRefBun] = useDrop({
    accept: "bun",
    drop(item: {id: string}) {
      dispatch(addBunToConstructor(data.find((elem: TIngridient) => elem._id === item.id)));
    },
  });

  const [, targetRefIngridient] = useDrop({
    accept: "ingridient",
    drop(item: {id: string}) {
      dispatch(
        addIngridientToConstructor(
          data.find((elem: TIngridient) => elem._id === item.id),
          uuidv4()
        )
      );
    },
  });

  // Модальные окна

  const openOrderModal = () => {
    userData.isLoggin
      ? dispatch(setOrder(idArr))
      : history.replace({ pathname: "/login" });
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
          ingridients.map((elem: TIngridient & {uuid: string}, index: number) => {
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
        <ModalOverlay close={closeModal}>
          <p className="text text_type_main-default">Отправляем данные</p>
        </ModalOverlay>
      )}
      {orderData.openModal && orderData.success && (
        <Modal close={closeModal}>
          <OrderDetails orderSet={orderData}></OrderDetails>
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
