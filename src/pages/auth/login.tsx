import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, SyntheticEvent } from "react";
import { useSelector, useDispatch } from "../../services/types/hooks";

import { Link } from "react-router-dom";
import ModalOverlay from "../../components/ModalOverlay/ModalOverlay";
import { loginUser } from "../../services/actions/auth";

import styles from "./stylesForm.module.css";
import useInput from "../../services/hooks/useInput";

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const { values, changeInput, setValue } = useInput({
    email: "",
    password: "",
  });
  const userData = useSelector((store) => store.userData);

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(values));
    setValue({ email: "", password: "" });
  };

  return (
    <div className={styles.container}>
      <p className="mb-6 text text_type_main-small">Вход</p>
      <form onSubmit={submitForm}>
        <EmailInput
          onChange={changeInput}
          name={"email"}
          value={values.email}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={changeInput}
          name={"password"}
          value={values.password}
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
        <ModalOverlay close={() => {}}>
          <p className="text text_type_main-default">Отправляем данные</p>
        </ModalOverlay>
      )}
    </div>
  );
};

export default LoginPage;
