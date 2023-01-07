import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./stylesForm.module.css";

export default function LoginPage() {
    const [value, setValue] = useState()

    function onChange(e) {
        console.log(e.target.value)
    }


  return (
    <div className={styles.container}>
      <p className="mb-6 text text_type_main-small">Вход</p>
      <EmailInput onChange={onChange} name={"email"} value={value} isIcon={false} extraClass="mb-6" />
      <PasswordInput onChange={onChange} name={"password"} value={value} extraClass="mb-6" />
      <Button size="medium" type="primary" htmlType="button" extraClass="mb-20">
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive mb-2">
        Вы — новый пользователь?{" "}
        <Link className={styles.link} to="/registration">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
      </p>
    </div>
  );
}
