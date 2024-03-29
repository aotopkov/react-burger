import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "../../services/types/hooks";

import OrdersList from "../../components/OrdersList/OrdersList";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/socket";
import styles from "./orderFeed.module.css";
import { TOrderData } from "../../services/types/data";
import { wsUrlOrder } from "../../services/store";
import ModalOverlay from "../../components/ModalOverlay/ModalOverlay";

const OrderFeedPage: FC = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector((store) => store.orderInfo);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, url: `${wsUrlOrder}/all` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const statusDone = ordersData.get
    ? ordersData.orders.map((elem: TOrderData) => {
        if (elem.status === "done") {
          return elem.number;
        }
      })
    : [];

  const statusPending = ordersData.get
    ? ordersData.orders.map((elem: TOrderData) => {
        if (elem.status === "pending") {
          return elem.number;
        }
      })
    : [];

  return (
    <>
      {ordersData.start && (
        <ModalOverlay close={() => {}}>Открываем соединение</ModalOverlay>
      )}
      {ordersData.get && (
        <section className={styles.container}>
          <p className="text text_type_main-large">Лента заказов</p>
          <div className={styles.orders__container}>
            <div className={styles.orders__list}>
              <OrdersList ordersData={ordersData} />
            </div>
            <div className={styles.orders__status_container}>
              <p className="text text_type_main-default">Готовы:</p>
              <div className={styles.orders__statuslist_container}>
                <ul className={styles.orders__statuslist}>
                  {statusDone.slice(0, 10).map((elem, index) => {
                    return (
                      <li key={index}>
                        <p
                          className={`${styles.status_done} text text_type_digits-default`}
                        >
                          {elem}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <ul className={styles.orders__statuslist}>
                  {statusDone.slice(11, 21).map((elem, index) => {
                    return (
                      <li key={index}>
                        <p
                          className={`${styles.status_done} text text_type_digits-default`}
                        >
                          {elem}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.orders__status_container}>
              <p className="text text_type_main-default">Выполняются:</p>
              <div className={styles.orders__statuslist_container}>
                <ul className={styles.orders__statuslist}>
                  {statusPending.slice(0, 10).map((elem, index) => {
                    return (
                      <li key={index}>
                        <p
                          className={`${styles.status_done} text text_type_digits-default`}
                        >
                          {elem}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <ul className={styles.orders__statuslist}>
                  {statusPending.slice(11, 21).map((elem, index) => {
                    return (
                      <li key={index}>
                        <p
                          className={`${styles.status_done} text text_type_digits-default`}
                        >
                          {elem}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <p className={`${styles.orders__total} text text_type_main-medium`}>
              Выполнено за все время:
            </p>
            <p
              className={`${styles.orders__total} text text_type_digits-large`}
            >
              {ordersData.total}
            </p>
            <p
              className={`${styles.orders__total} text text_type_main-default`}
            >
              Выполненов за сегодня:
            </p>
            <p
              className={`${styles.orders__total} text text_type_digits-large`}
            >
              {ordersData.totalToday}
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderFeedPage;
