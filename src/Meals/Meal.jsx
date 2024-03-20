/* eslint-disable react/prop-types */
import Button from "../Button/Button";

export default function Meal({ meal, onAdd }) {
  return (
    <div className="meal-item">
      <div className="article">
        <img src={`http://localhost:3000/${meal.image}`} alt="" />
        <h3>{meal.name}</h3>
        <div className="meal-item-price">{meal.price} €</div>
        <div className="meal-item-description">{meal.description}</div>
        <div className="meal-item-actions">
          <Button onClick={() => onAdd(meal)}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
