import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/types/hooks";

import { Link, useHistory } from "react-router-dom";
import { SET_USER_DATA_EMAIL_TOKEN } from "../../services/actions/auth";
import { burgerApiUrl, passwordForgotApi } from "../../utils/Api";

import styles from "./stylesForm.module.css";
import useInput from "../../services/hooks/useInput";
import { FC, SyntheticEvent } from "react";

const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { values, changeInput, setValue } = useInput({ email: "" });

  const SubmitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    passwordForgotApi(burgerApiUrl, values)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_USER_DATA_EMAIL_TOKEN,
          });
          history.replace({ pathname: "/reset-password" });
          setValue({ email: "" });
        }
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  return (
    <form onSubmit={SubmitForm} className={styles.container}>
      <p className="mb-6 text text_type_main-small">Восстановление пароля</p>
      <EmailInput
        name="email"
        onChange={changeInput}
        value={values.email}
        placeholder="укажите e-mail"
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

export default ForgotPasswordPage;
