import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";

function App() {
  const [state, setState] = React.useState({
    error: false,
    loading: false,
    data: [],
  });

  const getData = () => {
    setState({ ...state, error: false, loading: true });
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        setState({ ...state, data: res.data, loading: false });
      })
      .catch((err) => {
        setState({ ...state, error: true, loading: false });
        console.log(err);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const visible = React.useRef(false);

  const button = () => {};

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        {state.loading && "Загрузка..."}
        {state.error && "Ошибка!"}
        {!state.loading && state.data.length && (
          <>
            <BurgerIngridients data={state.data} />
            <BurgerConstructor
              data={state.data}
              bun={state.data.find((elem) => elem.type === "bun")}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
