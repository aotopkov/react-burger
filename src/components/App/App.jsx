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
    </div>
  );
}

export default App;
