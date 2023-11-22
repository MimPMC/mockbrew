/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

   const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'
        );

        setDrinks(response.data.drinks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <header>
        <h1> Mark's To-drink list</h1>
      </header>
      <main>
         <ul>
        {drinks.map((drink) => (
          <li key={drink.idDrink} className='list-item'>
            <img src={drink.strDrinkThumb} alt={drink.strDrink} className='drink-img'/>
            {drink.strDrink}
            </li>
        ))}
      </ul>
      </main>
    </div>
  )
}

export default App
