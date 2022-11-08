import React from "react";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import styles from "./AppHeader.module.css";

function AppHeader() {
    return (
      <header className={styles.AppHeader}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <BurgerIcon />
              <p className="text text_type_main-default">Конструктор</p>
            </li>
            <li className={styles.navItem}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лист заказов
              </p>
            </li>
            <li className={styles.logo}>
              <Logo />
            </li>
            <li className={styles.navItem}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Личный кабинет
              </p>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

export default AppHeader;
