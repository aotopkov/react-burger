import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Route, Switch } from "react-router-dom";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const activeLink = `${styles.activeLink} text text_type_main-medium`;
  const inactiveLink = `${styles.link} text text_type_main-medium text_color_inactive`;

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
            <p className="text text_type_main-medium text_color_inactive">
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
          <div className={styles.profileEdit}>
            <Input placeholder="Имя" icon={"EditIcon"} />
            <EmailInput placeholder="Логин" icon={"EditIcon"} />
            <PasswordInput placeholder="Пароль" icon={"EditIcon"} />
          </div>
        </Route>
        <Route path="/profile/orderHistory">
          <p>История заказов</p>
        </Route>
      </Switch>
    </div>
  );
}
