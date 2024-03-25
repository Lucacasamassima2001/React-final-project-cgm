// cart functions

// function to increase Meal quantity

export const increaseItemQuantity = (item, setData, data) => {
  setData({
    ...data,
    items: data.items.map((meal) => {
      if (meal.id === item.id) {
        return {
          ...meal,
          quantity: meal.quantity + 1,
        };
      }
      return meal;
    }),
  });
};

// function to decrease Meal quantity

export const decreaseItemQuantity = (item, setData, data) => {
  if (item.quantity > 1) {
    setData({
      ...data,
      items: data.items.map((meal) => {
        if (meal.id === item.id) {
          return {
            ...meal,
            quantity: meal.quantity - 1,
          };
        }
        return meal;
      }),
    });
  }

  if (item.quantity === 1) {
    setData({
      ...data,
      items: data.items.filter((meal) => meal.id !== item.id),
    });
  }
};
