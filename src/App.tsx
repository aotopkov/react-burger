import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import BurgerIngridients from './components/BurgerIngredients/BurgerIngridients';
import data from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main className='main'>
      <BurgerIngridients data={data}/>
      <BurgerConstructor data={data} bun={data.find(elem => elem.type === 'bun')}/>
      </main>
    </div>
  );
}

export default App;


