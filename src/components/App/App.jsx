import { useEffect, useCallback } from "react";
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
  OrderFeedPage,
  OrderInfoPage,
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
  const ordersData = useSelector((store) => store.orderInfo);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUser());
    }
  }, [dispatch, isAuth]);

  function closeModal() {
    history.goBack();
  }

  return (
    <div className={styles.App}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/login">
          <ProtectedRoute forAuth={false} component={<LoginPage />} />
        </Route>
        <Route path="/registration">
          <ProtectedRoute forAuth={false} component={<RegistrationPage />} />
        </Route>
        <Route path="/forgot-password">
          <ProtectedRoute forAuth={false} component={<ForgotPasswordPage />} />
        </Route>
        <Route path="/reset-password">
          <ProtectedRoute forAuth={false} component={<ResetPasswordPage />} />
        </Route>

        <Route exact path="/feed" component={OrderFeedPage} />
        {success && (
          <Route path="/ingridient/:id">
            <IngridientPage />
          </Route>
        )}

        <Route path="/feed/:id">
          <OrderInfoPage type="full" />
        </Route>
        <Route path="/profile/orders/:id">
          <ProtectedRoute
            forAuth={true}
            component={<OrderInfoPage type="full" forAuth={true} />}
          />
        </Route>
        <Route path="/profile">
          <ProtectedRoute forAuth={true} component={<ProfilePage />} />
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
          <Modal close={closeModal}>
            <IngridientPage />
          </Modal>
        </Route>
      )}
      {background && ordersData.get && (
        <Route path="/feed/:id">
          <Modal close={closeModal}>
            <OrderInfoPage type="modal" />
          </Modal>
        </Route>
      )}
      {background && ordersData.get && (
        <Route path="/profile/orders/:id">
          <Modal close={closeModal}>
            <OrderInfoPage type="modal" forAuth={true} />
          </Modal>
        </Route>
      )}
    </div>
  );
}

export default App;
