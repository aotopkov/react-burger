import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./stylesForm.module.css";

export default function RegistrationPage() {
  const [value, setValue] = useState();

  function onChange(e) {
    console.log(e.target.value);
  }

  return (
    <div className={styles.container}>
      <p className="mb-6 text text_type_main-small">Регистрация</p>
      <Input
        onChange={onChange}
        type="text"
        value={value}
        extraClass="mb-6"
        placeholder="Имя"
      />
      <EmailInput onChange={onChange} value={value} extraClass="mb-6" />
      <PasswordInput onChange={onChange} value={value} extraClass="mb-6" />
      <Button size="medium" type="primary" htmlType="button" extraClass="mb-20">
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}
