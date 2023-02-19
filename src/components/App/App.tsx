import { FC, useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import { useSelector, useDispatch } from "../../services/types/hooks";
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
} from "../../pages/index";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import { getCookie } from "../../utils/cookie";
import { getData } from "../../services/actions/ingridients";
import { getUser } from "../../services/actions/auth";
import { TWsOrderInfo } from "../../services/reducers/socket";
import { Location, LocationState } from "history";

type TUseLocation = LocationState & {
  background?: Location;
};

const App: FC = () => {
  const isAuth = getCookie("accessToken");
  const location = useLocation<TUseLocation>();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const { data, dataRequest, dataFailed, success } = useSelector(
    (store) => store.data
  );
  const history = useHistory();
  const ordersData: TWsOrderInfo = useSelector((store) => store.orderInfo);

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
        <ProtectedRoute
          path="/login"
          forAuth={false}
          component={<LoginPage />}
        />
        <ProtectedRoute
          path="/registration"
          forAuth={false}
          component={<RegistrationPage />}
        />
        <ProtectedRoute
          path="/forgot-password"
          forAuth={false}
          component={<ForgotPasswordPage />}
        />
        <ProtectedRoute
          path="/reset-password"
          forAuth={false}
          component={<ResetPasswordPage />}
        />
        <Route exact path="/feed" component={OrderFeedPage} />
        {success && (
          <Route path="/ingridient/:id">
            <IngridientPage />
          </Route>
        )}
        <Route path="/feed/:id">
          <OrderInfoPage type="full" />
        </Route>
        <ProtectedRoute
          forAuth={true}
          path="/profile/orders/:id"
          component={<OrderInfoPage type="full" />}
        />
        <ProtectedRoute
          path="/profile"
          forAuth={true}
          component={<ProfilePage />}
        />
        <Route exact path="/">
          <main className={styles.main}>
            {dataRequest && (
              <ModalOverlay close={closeModal}>
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
            <OrderInfoPage type="modal" />
          </Modal>
        </Route>
      )}
    </div>
  );
};

export default App;
