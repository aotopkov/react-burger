import { Link, useLocation } from "react-router-dom";
import OrderInfo from "../OrderInfo/OrderInfo";
import styles from "./OrderList.module.css";
import PropTypes from "prop-types";

export default function OrdersList({ ordersData }) {
  const location = useLocation();
  const url = location.pathname === "/feed" ? "/feed" : "/profile/orders";

  return (
    <ul className={styles.orders__list}>
      {ordersData.data.orders.map((elem) => {
        return (
          <li key={elem.number}>
            <Link
              to={{
                pathname: `${url}/${elem.number}`,
                state: { background: location },
              }}
              className={styles.link}
            >
              <OrderInfo
                type="small"
                number={elem.number}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

OrdersList.propTypes = {
  ordersData: PropTypes.object.isRequired,
};
