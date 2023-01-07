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
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFoundPage
} from './../../pages/index'

function App() {
  const dispatch = useDispatch();
  const { data, dataRequest, dataFailed } = useSelector((store) => store.data);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <AppHeader />
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/registration" component={RegistrationPage}/>
          <Route path='/forgot-password' component={ForgotPasswordPage}/>
          <Route path='/reset-password' component={ResetPasswordPage}/>
          <Route path='/profile' component={ProfilePage}/>
          <Route exact path="/">
            <main className={styles.main}>
              {dataRequest && (
                <ModalOverlay>
                  <p className="text text_type_main-default">
                    Загружаем данные
                  </p>
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
          <Route component={NotFoundPage}/>
        </Switch>
    </div>
  );
}

export default App;
