import { useEffect } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import { useSelector, useDispatch } from "react-redux";
import { compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getData } from "../../services/actions/actions";
import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const enhancers = composeEnhancers(applyMiddleware(thunk));

function App() {
  const dispatch = useDispatch();
  const { data, dataRequest, dataFailed } = useSelector((store) => store.data);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        {dataRequest && "Загрузка"}
        {dataFailed && "Ошибка Загрузки"}
        {!dataRequest && !dataFailed && data.length && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </div>
  );
}

export default App;
