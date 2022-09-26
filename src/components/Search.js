import { allMealsUrl } from '../context/context';
import { useState } from 'react';
import { useGlobalContext } from '../context/context';
import { MdOutlineFastfood } from 'react-icons/md';

import React from 'react';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [isRandom, setIsRandom] = useState(false);

  const { setSearchTerm, fetchRandomMeal, fetchMeals } = useGlobalContext();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length >= 3) {
      setSearchTerm(inputValue);
    }
  };

  const handleRandomMeal = () => {
    setSearchTerm('');
    setInputValue('');
    setIsRandom(true);
    fetchRandomMeal();
  };

  const homeBtn = () => {
    console.log(isRandom);
    if (!inputValue && !isRandom) return;
    setSearchTerm('');
    setInputValue('');
    setIsRandom(false);
    fetchMeals(allMealsUrl);
  };

  return (
    <header className="search-container">
      <button className="home-btn" onClick={homeBtn}>
        <MdOutlineFastfood />
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search.."
          value={inputValue}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="btn">
          Search
        </button>
        <button
          type="button"
          className="btn btn-hipster"
          onClick={handleRandomMeal}
        >
          Random meal
        </button>
      </form>
    </header>
  );
};

export default Search;
