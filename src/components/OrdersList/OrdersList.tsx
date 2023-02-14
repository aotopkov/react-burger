import { Link, useLocation } from "react-router-dom";
import OrderInfo from "../OrderInfo/OrderInfo";
import styles from "./OrderList.module.css";
import { FC } from "react";
import { TOrderData } from "../../services/types/data";
import { TWsOrderInfo } from "../../services/reducers/socket";

interface IOrderList {
  ordersData: TWsOrderInfo;
}

const OrdersList: FC<IOrderList> = ({ ordersData }) => {
  const location = useLocation();
  const url = location.pathname === "/feed" ? "/feed" : "/profile/orders";

  return (
    <ul className={styles.orders__list}>
      {ordersData.orders.map((elem: TOrderData) => {
        return (
          <li key={elem.number}>
            <Link
              to={{
                pathname: `${url}/${elem.number}`,
                state: { background: location },
              }}
              className={styles.link}
            >
              <OrderInfo type="small" number={elem.number} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default OrdersList;
