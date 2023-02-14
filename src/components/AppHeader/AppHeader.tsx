import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { FC } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";

import styles from "./AppHeader.module.css";

const AppHeader: FC = () => {
  const path = useLocation().pathname;

  return (
    <header className={styles.AppHeader}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {path == "/" && (
            <li className={styles.navItem}>
              <Link to={{ pathname: `/` }} className={styles.link}>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">Конструктор</p>
              </Link>
            </li>
          )}
          {path !== "/" && (
            <li className={styles.navItem}>
              <Link to={{ pathname: `/` }} className={styles.link}>
                <BurgerIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">
                  Конструктор
                </p>
              </Link>
            </li>
          )}
          {path.includes('feed') && (<li className={styles.navItem}>
            <NavLink to={{ pathname: "/feed" }} className={styles.link}>
              <ListIcon type="primary" />
              <p className="text text_type_main-default">
                Лист заказов
              </p>
            </NavLink>
          </li>)}
          {!path.includes('feed') &&(<li className={styles.navItem}>
            <NavLink to={{ pathname: "/feed" }} className={styles.link}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лист заказов
              </p>
            </NavLink>
          </li>)}
          <li className={styles.logo}>
            <Link to="/">
              <Logo />
            </Link>
          </li>
          {path.includes("profile") && (
            <li className={styles.navItem}>
              <NavLink to={{ pathname: "/profile" }} className={styles.link}>
                <ProfileIcon type="primary" />
                <p className="text text_type_main-default">Личный кабинет</p>
              </NavLink>
            </li>
          )}
          {!path.includes("profile") && (
            <li className={styles.navItem}>
              <NavLink to={{ pathname: "/profile" }} className={styles.link}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">
                  Личный кабинет
                </p>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
