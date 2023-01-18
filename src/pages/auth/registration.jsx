import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalOverlay from "../../components/ModalOverlay/ModalOverlay";
import { setRegUser } from "../../services/actions/auth";

import styles from "./stylesForm.module.css";

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const userData = useSelector((store) => store.userData);

  function changeInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(setRegUser(form));
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitForm}>
        {userData.userDataRequest && (
          <ModalOverlay>
            <p className="text text_type_main-default">Отправляем данные</p>
          </ModalOverlay>
        )}
        <p className="mb-6 text text_type_main-small">Регистрация</p>
        <Input
          onChange={changeInput}
          type="text"
          name={"name"}
          value={form.name}
          extraClass="mb-6"
          placeholder="Имя"
        />
        <EmailInput
          onChange={changeInput}
          extraClass="mb-6"
          name={"email"}
          value={form.email}
        />
        <PasswordInput
          onChange={changeInput}
          extraClass="mb-6"
          name={"password"}
          value={form.password}
        />
        <Button
          size="medium"
          type="primary"
          htmlType="submit"
          extraClass="mb-20"
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}
