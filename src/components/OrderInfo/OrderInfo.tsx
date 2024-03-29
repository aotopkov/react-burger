import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/types/hooks";

import styles from "./OrderInfo.module.css";
import { useLocation } from "react-router-dom";
import { FC } from "react";
import { TIngridient, TOrderData } from "../../services/types/data";

interface IOrderInfo {
  type: "full" | "small" | "modal";
  number: number | undefined;
}

const OrderInfo: FC<IOrderInfo> = ({ type, number }) => {
  const path = useLocation().pathname;
  const dataStore = useSelector((store) => store.data.data);
  const orderData = useSelector((store) => store.orderInfo);
  const order = getOrder();
  const currentData = getCurrentData();

  function getOrder(): TOrderData | undefined {
    if (orderData.get) {
      return orderData.orders.find((elem) => elem.number == number);
    } else {
      return undefined;
    }
  }

  function getCurrentData() {
    const currentData: TIngridient[] = [];
    dataStore.filter((dataElem: TIngridient) => {
      if (order != undefined) {
        order.ingredients.map((orderElem) => {
          if (orderElem === dataElem._id) {
            return currentData.push(dataElem);
          }
        });
      }
    });
    return currentData;
  }

  const reduceCurrentData = [...new Set(currentData)];
  const elementOver = reduceCurrentData.at(6);

  const orderCost = currentData.reduce((acc, elem) => acc + elem.price, 0);
  const date = order ? new Date(order.updatedAt) + "" : "out off date";

  if (type === "small" && order != undefined) {
    return (
      <div className={styles.container_small}>
        <div className={styles.header}>
          <p className="text text_type_digits-default">{order.number}</p>
          <p className="text text_type_main-small text_color_inactive">
            {`${date.slice(4, 33)}`}
          </p>
        </div>
        <p className="text text_type_main-medium mt-6">{order.name}</p>
        {path.includes("profile") && order.status === "created" && (
          <p className="text text_type_main-default mt-2">Создан</p>
        )}
        {path.includes("profile") && order.status === "pending" && (
          <p className="text text_type_main-default mt-2">Выполняется</p>
        )}
        {path.includes("profile") && order.status === "done" && (
          <p
            className={`${styles.status_done} text text_type_main-default mt-2`}
          >
            Выполнен
          </p>
        )}
        <div className={styles.ingredients}>
          <ul className={styles.image__list_small}>
            {reduceCurrentData.slice(0, 5).map((elem) => {
              return (
                <li className={styles.image__container} key={elem._id}>
                  <img
                    className={styles.image_small}
                    src={elem.image}
                    alt={elem.name}
                  ></img>
                </li>
              );
            })}
            {reduceCurrentData.length >= 6 && elementOver && (
              <li className={styles.image__container} key={elementOver._id}>
                <div className={styles.count}>
                  <p className="text text_type_main-default">
                    {`+${reduceCurrentData.length}`}
                  </p>
                </div>
                <img
                  className={styles.image_small}
                  src={elementOver.image}
                  alt={elementOver.name}
                ></img>
              </li>
            )}
          </ul>
          <div className={styles.price}>
            <p className="text text_type_digits-medium">{orderCost}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  }

  if ((type == "full" || "modal") && order != undefined) {
    return (
      <div
        className={`${
          type === "full" ? styles.containerFull : styles.containerModal
        }`}
      >
        <p
          className={`${
            type === "full" ? styles.numberFull : styles.numberModal
          } text text_type_digits-default mb-10`}
        >
          {order.number}
        </p>
        <p className="text text_type_main-medium mb-3">{order.name}</p>
        {order.status == "done" && (
          <p
            className={`${styles.status_done} text text_type_main-default mb-15`}
          >
            Выполнен
          </p>
        )}
        <p className="text text_type_main-medium">Состав:</p>
        <div>
          <ul className={styles.ingredient__list}>
            {reduceCurrentData.map((elem) => {
              const count = currentData.filter((i) => i._id == elem._id);
              return (
                <li
                  key={elem._id}
                  className={styles.ingredient__container_full}
                >
                  <div className={styles.image__container}>
                    <img
                      src={elem.image}
                      alt={elem.name}
                      className={styles.image_small}
                    />
                  </div>
                  <p className="text text_type_main-default">{elem.name}</p>
                  <p
                    className={`${styles.ingredient__container_full_cost} text text_type_digits-default`}
                  >
                    {count.length} x {elem.price}
                  </p>
                  <div className={styles.ingredient__container_full_child}>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.order__footer}>
          <p className="text text_type_main-small text_color_inactive">
            {`${date.slice(4, 33)}`}
          </p>
          <p
            className={`${styles.ingredient__container_full_cost} text text_type_digits-default`}
          >
            {orderCost}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    );
  }

  return <></>;
};

export default OrderInfo;
