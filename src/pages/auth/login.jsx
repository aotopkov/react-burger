import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalOverlay from "../../components/ModalOverlay/ModalOverlay";
import { loginUser } from "../../services/actions/auth";

import styles from "./stylesForm.module.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const userData = useSelector((store) => store.userData);

  function changeInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
    setForm({ email: "", password: "" });
  };

  return (
    <div className={styles.container}>
      <p className="mb-6 text text_type_main-small">Вход</p>
      <form onSubmit={submitForm}>
        <EmailInput
          onChange={changeInput}
          name={"email"}
          value={form.email}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={changeInput}
          name={"password"}
          value={form.password}
          extraClass="mb-6"
        />
        {userData.failed && (
          <p className="text text_type_main-default mb-2">
            Неверный логин / пароль
          </p>
        )}
        <Button
          size="medium"
          type="primary"
          htmlType="submit"
          extraClass="mb-20"
        >
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-2">
        Вы — новый пользователь?{" "}
        <Link className={styles.link} to="/registration">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
      {userData.request && (
        <ModalOverlay>
          <p className="text text_type_main-default">Отправляем данные</p>
        </ModalOverlay>
      )}
    </div>
  );
}
