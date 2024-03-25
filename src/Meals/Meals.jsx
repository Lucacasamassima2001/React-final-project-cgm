/* eslint-disable react/prop-types */
import Meal from "./Meal";
import styles from "./Meals.module.css";

export default function Meals({ meals, onAdd, loadingText, fallBackText }) {
  return (
    <div id={styles.meals}>
      {loadingText && <h1 className="fetching-text">{loadingText}</h1>}
      {fallBackText && <h1 className="fetching-text">{fallBackText}</h1>}
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} onAdd={onAdd} />
      ))}
    </div>
  );
}
