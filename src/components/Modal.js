import { useGlobalContext } from '../context/context';

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext();

  const {
    strMealThumb: image,
    strMeal: title,
    strInstructions: instructions,
    strSource: source,
  } = selectedMeal;

  return (
    <aside className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src={image} alt={title} className="img modal-img" />
        <div className="modal-content">
          <h3>{title}</h3>
          <h5>Cooking Instructions</h5>
          <p>{instructions}</p>
          <div className="modal-footer">
            <a href={source} target="_blank" rel="noreferrer">
              Source
            </a>
            <button className="btn btn-hipster close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
