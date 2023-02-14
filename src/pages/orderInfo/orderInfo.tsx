import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "../../services/types/hooks";

import { useLocation, useParams } from "react-router-dom";
import OrderInfo from "../../components/OrderInfo/OrderInfo";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_FOR_AUTH,
} from "../../services/actions/socket";
import { getCookie } from "../../utils/cookie";
import styles from "./orderInfo.module.css";

interface IOrderInfoPage {
  type: "small" | "full" | "modal";
}

interface IUseParams {
  id: string;
}

const OrderInfoPage: FC<IOrderInfoPage> = ({ type }) => {
  const isAuth = getCookie("accessToken");
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const params = useParams<IUseParams>();
  const ordersData = useSelector((store) => store.orderInfo);

  useEffect(() => {
    path.includes("profile") && isAuth
      ? dispatch({ type: WS_CONNECTION_START_FOR_AUTH })
      : dispatch({ type: WS_CONNECTION_START });
  }, []);

  return (
    <div className={type === "full" ? styles.container : ""}>
      {ordersData.get && <OrderInfo type={type} number={parseInt(params.id)} />}
    </div>
  );
};

export default OrderInfoPage;
