import logo from "../../images/done.svg";

import styles from "./OrderDetails.module.css";
import { FC } from "react";
import { TOrderSet } from "../../services/reducers/order";

const OrderDetails: FC<{ orderSet: TOrderSet }> = ({ orderSet }) => {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large">{orderSet.number}</p>
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img src={logo} alt="черный бублик" />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
