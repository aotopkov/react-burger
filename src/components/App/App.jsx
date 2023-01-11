import { useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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
import { getCookie } from "../../utils/cookie";
import { getData } from "../../services/actions/ingridients";
import { getUser } from "../../services/actions/auth";

function App() {
  const isAuth = getCookie("accessToken");
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const { data, dataRequest, dataFailed, success } = useSelector(
    (store) => store.data
  );
  const history = useHistory();

  useEffect(() => {
    dispatch(getData());
    if (isAuth) {
      dispatch(getUser());
    }
  }, [dispatch]);

  
  function closeModal() {
    history.goBack();
  }

  return (
    <div className={styles.App}>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute
          forAuth={false}
          path="/login"
          component={<LoginPage />}
        />
        <ProtectedRoute
          forAuth={false}
          path="/registration"
          component={<RegistrationPage />}
        />
        <ProtectedRoute
          forAuth={false}
          path="/forgot-password"
          component={<ForgotPasswordPage />}
        />
        <ProtectedRoute
          forAuth={false}
          path="/reset-password"
          component={<ResetPasswordPage />}
        />
        {success && <Route path="/ingridient/:id" component={IngridientPage} />}

        <ProtectedRoute
          forAuth={true}
          path="/profile"
          component={<ProfilePage />}
        />

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
          <Modal close={closeModal}>
            <IngridientPage />
          </Modal>
        </Route>
      )}
    </div>
  );
}

export default App;
