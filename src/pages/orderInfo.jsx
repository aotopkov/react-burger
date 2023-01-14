import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OrderInfo from "../components/OrderInfo/OrderInfo";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_FOR_AUTH,
} from "../services/actions/socket";
import { getCookie } from "../utils/cookie";
import styles from "./orderInfo.module.css";

export default function OrderInfoPage({ type, forAuth }) {
  const isAuth = getCookie("accessToken");
  const dispatch = useDispatch();
  const { id } = useParams();
  const ordersData = useSelector((store) => store.orderInfo);

  useEffect(() => {
    forAuth && isAuth
      ? dispatch({ type: WS_CONNECTION_START_FOR_AUTH })
      : dispatch({ type: WS_CONNECTION_START });
  }, []);

  return (
    <div className={type == "full" ? styles.container : ""}>
      {ordersData.get && (
        <OrderInfo type={type} forAuth={forAuth} number={id} />
      )}
    </div>
  );
}
