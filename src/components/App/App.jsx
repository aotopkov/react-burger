import { useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../services/actions/actions";
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { Route, Switch, useLocation } from "react-router-dom";
import {
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage,
  IngridientPage,
} from "./../../pages/index";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import Auth from "../../utils/Auth";

function App() {
  let location = useLocation();
  let background = location.state && location.state.background;
  const { getUser } = Auth();
  const dispatch = useDispatch();
  const { data, dataRequest, dataFailed, success } = useSelector(
    (store) => store.data
  );

  const init = async () => {
    await getUser();
    dispatch(getData());
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles.App}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />
        {success && <Route path="/ingridient/:id" component={IngridientPage} />}
        <Route path="/profile">
          <ProtectedRoute component={<ProfilePage />} />
        </Route>
        <Route exact path="/">
          <main className={styles.main}>
            {dataRequest && (
              <ModalOverlay>
                <p className="text text_type_main-default">Загружаем данные</p>
              </ModalOverlay>
            )}
            {dataFailed && "Ошибка Загрузки"}
            {!dataRequest && !dataFailed && data.length && (
              <DndProvider backend={HTML5Backend}>
                <BurgerIngridients />
                <BurgerConstructor />
              </DndProvider>
            )}
          </main>
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
      {background && (
        <Route path="/ingridient/:id">
          <Modal>
            <IngridientPage />
          </Modal>
        </Route>
      )}
    </div>
  );
}

export default App;
