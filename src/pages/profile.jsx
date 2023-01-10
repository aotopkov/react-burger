import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import Auth from "../utils/Auth";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const { changeUserData, logoutUser } = Auth();
  const activeLink = `${styles.activeLink} text text_type_main-medium`;
  const inactiveLink = `${styles.link} text text_type_main-medium text_color_inactive`;
  const userData = useSelector((store) => store.userData);
  const history = useHistory();
  const [user, setUser] = useState({
    visible: false,
  });

  useEffect(() => {
    setUser({ name: userData.user.name, email: userData.user.email });
  }, [])


  async function logout() {
    await logoutUser();
    history.replace({ pathname: "/login" });
  }

  function onChange(e) {
    setUser({ visible: true, [e.target.name]: e.target.value });
    console.log(user);
  }

  const saveChanges = async (e) => {
    e.preventDefault();
    await changeUserData(user);
    setUser({
      visible: false,
    });
  };

  function cancelChanges() {
    setUser({
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
              to={{ pathname: "/profile/orderHistory" }}
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
                  <Button onClick={cancelChanges} size="small">
                    Отменить
                  </Button>
                </>
              )}
            </form>
          )}
        </Route>
        <Route path="/profile/orderHistory">
          <p>История заказов</p>
        </Route>
      </Switch>
    </div>
  );
}
