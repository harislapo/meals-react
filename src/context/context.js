import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();

export const allMealsUrl =
  'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

// Custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

const loadFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem('favorites'));
  } else {
    favorites = [];
  }

  return favorites;
};

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(loadFavoritesFromLocalStorage());

  const fetchMeals = async (url) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.meals) {
        setMeals(result.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((m) => m.idMeal === idMeal);
    } else {
      // loop through already 25 loaded meals
      meal = meals.find((m) => m.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavorites = (idMeal) => {
    const existingFavorite = favorites.find((fm) => fm.idMeal === idMeal);
    // If its already favorited, don't do anything.
    if (existingFavorite) return;

    const meal = meals.find((m) => m.idMeal === idMeal);
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((m) => m.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        meals,
        isLoading,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        addToFavorites,
        removeFromFavorites,
        favorites,
        fetchMeals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
