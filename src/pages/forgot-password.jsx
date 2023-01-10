import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { SET_USER_DATA_EMAIL_TOKEN } from "../services/actions/actions";
import { burgerApiUrl, passwordForgotApi } from "../utils/Api";

import { getCookie } from "../utils/cookie";
import styles from "./stylesForm.module.css";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const history = useHistory();

  const ChangeInput = (e) => {
    setEmail(e.target.value);
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    passwordForgotApi(burgerApiUrl, email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_USER_DATA_EMAIL_TOKEN,
          });
          history.replace({ pathname: "/reset-password" });
          setEmail("");
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  if (getCookie("accessToken") !== undefined) {
    return (
      <>
        <Redirect to={"/"} />
      </>
    );
  }

  return (
    <form onSubmit={SubmitForm} className={styles.container}>
      <p className="mb-6 text text_type_main-small">Восстановление пароля</p>
      <EmailInput
        onChange={ChangeInput}
        value={email}
        placeholder="укажите e-mail"
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
