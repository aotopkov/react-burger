import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import OrdersList from "../components/OrdersList/OrdersList";
import { changeUserData, logoutUser } from "../services/actions/auth";
import { WS_CONNECTION_START_FOR_AUTH } from "../services/actions/socket";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const location = useLocation();
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
    dispatch({ type: WS_CONNECTION_START_FOR_AUTH });
  }, [dispatch]);

  useEffect(() => {
    setUser({ ...user, name: userData.user.name, email: userData.user.email });
  }, [userData]);

  function logout() {
    dispatch(logoutUser());
  }

  function onChange(e) {
    setUser({ ...user, visible: true, [e.target.name]: e.target.value });
  }

  const saveChanges = (e) => {
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
                icon={"EditIcon"}
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
        <Route exact path="/profile/orders">
          {ordersData.get ? (
            <OrdersList ordersData={ordersData} forAuth={true} />
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )}
        </Route>
      </Switch>
    </div>
  );
}
