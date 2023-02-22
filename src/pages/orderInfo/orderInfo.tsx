import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "../../services/types/hooks";

import { useLocation, useParams } from "react-router-dom";
import OrderInfo from "../../components/OrderInfo/OrderInfo";
import { WS_CONNECTION_START } from "../../services/actions/socket";
import styles from "./orderInfo.module.css";
import { wsUrlOrder } from "../../services/store";
import { getCookie } from "../../utils/cookie";

interface IOrderInfoPage {
  type: "small" | "full" | "modal";
}

const OrderInfoPage: FC<IOrderInfoPage> = ({ type }) => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const { id }: { id: string } = useParams();
  const ordersData = useSelector((store) => store.orderInfo);

  useEffect(() => {
    if (!ordersData.get) {
      path.includes("profile")
        ? dispatch({
            type: WS_CONNECTION_START,
            url: `${wsUrlOrder}?token=${getCookie("accessToken")}`,
          })
        : dispatch({ type: WS_CONNECTION_START, url: `${wsUrlOrder}/all` });
    }
  }, [dispatch]);

  return (
    <div className={type === "full" ? styles.container : ""}>
      {ordersData.get && <OrderInfo type={type} number={parseInt(id)} />}
    </div>
  );
};

export default OrderInfoPage;
