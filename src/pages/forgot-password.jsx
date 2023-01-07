import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./stylesForm.module.css";

export default function ForgotPasswordPage() {
    const history = useHistory()

    const handleClick = useCallback(() => {
        history.replace({pathname: '/reset-password'})
    }, [history])


  return (
    <div className={styles.container}>
      <p className="mb-6 text text_type_main-small">Восстановление пароля</p>
      <EmailInput placeholder="укажите e-mail" extraClass="mb-6" />
      <Button onClick={handleClick} size="medium" extraClass="mb-20">
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
