/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

// Create a context for the drink list
const DrinkListContext = createContext();

// Create a provider component to wrap your app with the context
export const DrinkListProvider = ({ children }) => {
  const [drinkList, setDrinkList] = useState([]);

  // Method to add a drink to the list
  const addDrink = (drink) => {
    setDrinkList((prevList) => [...prevList, drink]);
  };

  // Method to delete a drink from the list
 const deleteDrink = (drinkId) => {
  setDrinkList((prevList) => prevList.filter((drink) => drink.idDrink !== drinkId));
};



  // Context value to be provided to consumers
  const contextValue = {
    drinkList,
    addDrink,
    deleteDrink,
  };

  return (
    <DrinkListContext.Provider value={contextValue}>
      {children}
    </DrinkListContext.Provider>
  );
};

// Custom hook to access the drink list context
export const useDrinkList = () => {
  const context = useContext(DrinkListContext);
  if (!context) {
    throw new Error('useDrinkList must be used within a DrinkListProvider');
  }
  return context;
};