import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/types/hooks";

import { Link, Redirect, useHistory } from "react-router-dom";
import { burgerApiUrl, passwordResetApi } from "../../utils/Api";
import styles from "./stylesForm.module.css";
import useInput from "../../services/hooks/useInput";
import { FC, SyntheticEvent } from "react";

const ResetPasswordPage: FC = () => {
  const { values, changeInput, setValue } = useInput({
    token: "",
    password: "",
  });
  const history = useHistory();
  const userData = useSelector((store) => store.userData);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    passwordResetApi(burgerApiUrl, values)
      .then((res) => {
        if (res && res.success) {
          history.replace({ pathname: "/login" });
          setValue({
            token: "",
            password: "",
          });
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
        value={values.password}
        placeholder="Введите новый пароль"
        extraClass="mb-6"
      />
      <Input
        onChange={changeInput}
        value={values.token}
        name={"token"}
        placeholder="Введите код из письма"
        extraClass="mb-6"
      />
      <Button size="medium" extraClass="mb-20" htmlType="submit">
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
};

export default ResetPasswordPage;
