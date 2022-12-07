import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import { burgerApiUrl, getDatafromApi } from "../../utils/Api";
import { DataContext } from "../../utils/DataContext";

function App() {
  const [state, setState] = React.useState({
    error: false,
    loading: false,
  });

  const [data, setData] = React.useState([]);

  const getData = () => {
    setState({ ...state, error: false, loading: true });
    getDatafromApi(burgerApiUrl)
      .then((res) => {
        setState({ ...state, loading: false });
        setData(res.data);
      })
      .catch((err) => {
        setState({ ...state, error: true, loading: false });
        console.log(err);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.main}>
        {state.loading && "Загрузка..."}
        {state.error && "Ошибка!"}
        {!state.loading && data.length && (
          <DataContext.Provider value={{ data, setData }}>
            <BurgerIngridients />
            <BurgerConstructor />
          </DataContext.Provider>
        )}
      </main>
    </div>
  );
}

export default App;