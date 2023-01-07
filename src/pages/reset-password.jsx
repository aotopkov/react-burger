import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { Link } from "react-router-dom";
  import styles from "./stylesForm.module.css";
  
  export default function ResetPasswordPage() {
    return (
      <div className={styles.container}>
        <p className="mb-6 text text_type_main-small">Восстановление пароля</p>
        <PasswordInput placeholder="Введите новый пароль" extraClass="mb-6"/>
        <Input placeholder="Введите код из письма" extraClass="mb-6"/>
        <Button size="medium" extraClass="mb-20">
          Восстановить
        </Button>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    );
  }