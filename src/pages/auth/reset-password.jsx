import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { burgerApiUrl, passwordResetApi } from "../../utils/Api";
import styles from "./stylesForm.module.css";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({});
  const history = useHistory();
  const userData = useSelector((store) => store.userData);

  const changeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    passwordResetApi(burgerApiUrl, form)
      .then((res) => {
        if (res && res.success) {
          history.replace({ pathname: "/login" });
          setForm({});
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  if (!userData.emailToken) {
    return (
      <>
        <Redirect to="/forgot-password" />
      </>
    );
  }

  return (
    <form onSubmit={submitForm} className={styles.container}>
      <p className="mb-6 text text_type_main-small">Восстановление пароля</p>
      <PasswordInput
        onChange={changeInput}
        name={"password"}
        placeholder="Введите новый пароль"
        extraClass="mb-6"
      />
      <Input
        onChange={changeInput}
        value={form.token}
        name={"token"}
        placeholder="Введите код из письма"
        extraClass="mb-6"
      />
      <Button size="medium" extraClass="mb-20">
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </form>
  );
}
