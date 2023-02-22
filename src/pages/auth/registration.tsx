import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/types/hooks";

import { Link } from "react-router-dom";
import ModalOverlay from "../../components/ModalOverlay/ModalOverlay";
import { setRegUser } from "../../services/actions/auth";

import styles from "./stylesForm.module.css";
import useInput from "../../services/hooks/useInput";
import { FC, SyntheticEvent } from "react";

const RegistrationPage: FC = () => {
  const dispatch = useDispatch();
  const { values, changeInput, setValue } = useInput({
    name: "",
    email: "",
    password: "",
  });
  const userData = useSelector((store) => store.userData);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setRegUser(values));
    setValue({ name: "", email: "", password: "" });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitForm}>
        {userData.request && (
          <ModalOverlay close={() => {}}>
            <p className="text text_type_main-default">Отправляем данные</p>
          </ModalOverlay>
        )}
        <p className="mb-6 text text_type_main-small">Регистрация</p>
        <Input
          onChange={changeInput}
          type="text"
          name={"name"}
          value={values.name}
          extraClass="mb-6"
          placeholder="Имя"
        />
        <EmailInput
          onChange={changeInput}
          extraClass="mb-6"
          name={"email"}
          value={values.email}
        />
        <PasswordInput
          onChange={changeInput}
          extraClass="mb-6"
          name={"password"}
          value={values.password}
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
};

export default RegistrationPage;
