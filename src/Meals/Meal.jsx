/* eslint-disable react/prop-types */
import Button from "../Button/Button";
import styles from "./Meal.module.css";

export default function Meal({ meal, onAdd }) {
  return (
    <div className={styles.mealItem}>
      <div className={styles.article}>
        <img src={`http://localhost:3000/${meal.image}`} alt="" />
        <h3>{meal.name}</h3>
        <div className={styles.mealItemPrice}>{meal.price} €</div>
        <div className={styles.mealItemDescription}>{meal.description}</div>
        <div className={styles.mealItemActions}>
          <Button onClick={() => onAdd(meal)}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
