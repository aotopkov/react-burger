import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import styles from "./AppHeader.module.css";

function AppHeader() {
  // отключение eslint из-за ошибок пустых ссылок href в тэгах <a>
  /* eslint-disable */ 
  return (
    <header className={styles.AppHeader}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="#" className={styles.link}>
              <BurgerIcon />
              <p className="text text_type_main-default">Конструктор</p>
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.link} >
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лист заказов
              </p>
            </a>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.link}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Личный кабинет
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
