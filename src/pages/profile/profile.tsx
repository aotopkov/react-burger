import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "../../services/types/hooks";

import { NavLink, Route, Switch } from "react-router-dom";
import OrdersList from "../../components/OrdersList/OrdersList";
import {
  changeUserData,
  getUser,
  logoutUser,
  refreshToken,
} from "../../services/actions/auth";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/socket";
import styles from "./profile.module.css";
import { wsUrlOrder } from "../../services/store";
import ModalOverlay from "../../components/ModalOverlay/ModalOverlay";
import { getCookie } from "../../utils/cookie";

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const activeLink = `${styles.activeLink} text text_type_main-medium`;
  const inactiveLink = `${styles.link} text text_type_main-medium text_color_inactive`;
  const userData = useSelector((store) => store.userData);
  const ordersData = useSelector((store) => store.orderInfo);
  const [user, setUser] = useState({
    visible: false,
    name: "",
    email: "",
    password: "00000",
  });

  useEffect(() => {
    dispatch(getUser());
    if (userData.isLoggin) {
      dispatch({
        type: WS_CONNECTION_START,
        url: `${wsUrlOrder}?token=${getCookie("accessToken")}`,
      });
    }
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  useEffect(() => {
    setUser({ ...user, name: userData.user.name, email: userData.user.email });
  }, [userData]);

  const logout = () => {
    dispatch(logoutUser());
  };

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, visible: true, [e.target.name]: e.target.value });
  }

  const saveChanges = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(changeUserData(user));
    setUser({
      ...user,
      visible: false,
    });
  };

  function cancelChanges() {
    setUser({
      ...user,
      visible: false,
      name: userData.user.name,
      email: userData.user.email,
    });
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              exact
              to={{ pathname: "/profile" }}
              className={(isActive) => (isActive ? activeLink : inactiveLink)}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to={{ pathname: "/profile/orders" }}
              className={(isActive) => (isActive ? activeLink : inactiveLink)}
            >
              История заказов
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <p
              onClick={logout}
              className="text text_type_main-medium text_color_inactive"
            >
              Выход
            </p>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Switch>
        <Route path="/profile" exact>
          {userData.isLoggin && (
            <form onSubmit={saveChanges} className={styles.profileEdit}>
              <Input
                onChange={onChange}
                name={"name"}
                placeholder="Имя"
                icon={"EditIcon"}
                value={user.name}
              />
              <EmailInput
                onChange={onChange}
                name={"email"}
                placeholder="Логин"
                value={user.email}
              />
              <PasswordInput
                onChange={onChange}
                placeholder="Пароль"
                icon={"EditIcon"}
                value={user.password}
              />
              {user.visible && (
                <>
                  <Button htmlType="submit" size="small">
                    Сохранить
                  </Button>
                  <Button htmlType="reset" onClick={cancelChanges} size="small">
                    Отменить
                  </Button>
                </>
              )}
            </form>
          )}
        </Route>
        <Route path="/profile/orders">
          {ordersData.start && (
            <ModalOverlay close={() => {}}>Открываем соединение</ModalOverlay>
          )}
          {ordersData.get && userData.isLoggin && (
            <OrdersList ordersData={ordersData} />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default ProfilePage;
