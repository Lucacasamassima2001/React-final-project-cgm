/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../http";
import Meal from "./Meal";
import styles from "./Meals.module.css";

export default function Meals({ orderData, setOrderData }) {
  const [meals, setMeals] = useState({
    isFetching: null,
    error: null,
    meals: [],
  });

  // function to get meal
  const getItem = (meal) => {
    if (orderData.items.find((item) => item.id === meal.id)) {
      setOrderData({
        ...orderData,
        items: orderData.items.map((item) => {
          if (item.id === meal.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      });
    } else {
      setOrderData({
        ...orderData,
        items: [
          ...orderData.items,
          {
            id: meal.id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
            description: meal.description,
            quantity: 1,
          },
        ],
      });
    }
  };

  // fetch available meals
  useEffect(() => {
    async function fetchMeals() {
      setMeals((prevMeals) => {
        return {
          ...prevMeals,
          isFetching: true,
        };
      });
      try {
        const availableMeals = await fetchAvailableMeals();
        setMeals((prevMeals) => {
          return {
            ...prevMeals,
            meals: availableMeals,
          };
        });
      } catch (error) {
        setMeals((prevMeals) => {
          return {
            ...prevMeals,
            error: true,
          };
        });
      }
      setMeals((prevMeals) => {
        return {
          ...prevMeals,
          isFetching: false,
        };
      });
    }

    fetchMeals();
  }, []);

  return (
    <div id={styles.meals}>
      {meals.isFetching && (
        <h1 className="fetching-text">Loading Available Meals...</h1>
      )}
      {meals.error && (
        <h1 className="fetching-text">Error Loading Available Meals</h1>
      )}
      {meals.meals.map((meal) => (
        <Meal key={meal.id} meal={meal} onAdd={getItem} />
      ))}
    </div>
  );
}
