import { useGlobalContext } from '../context/context';
import { FaThumbsUp } from 'react-icons/fa';

const Meals = () => {
  const { meals, isLoading, selectMeal, addToFavorites } = useGlobalContext();

  if (isLoading) {
    return (
      <section className="section">
        <h4>Loading..</h4>
      </section>
    );
  }

  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>Nothing found!</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals.map((meal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = meal;

        return (
          <article className="single-meal" key={idMeal}>
            <img
              src={image}
              alt={title}
              className="img"
              onClick={() => selectMeal(idMeal)}
            />
            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={() => {
                  addToFavorites(idMeal);
                }}
              >
                <FaThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
