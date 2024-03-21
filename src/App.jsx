import Header from "./Header/Header";
import Meals from "./Meals/Meals";
import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "./http";
import Modal from "./Modals/Modal";
import Cart from "./Modals/Cart";
import Checkout from "./Modals/Checkout";
import HistoryModal from "./Modals/HistoryModal";
import Reviews from "./Reviews/Reviews";
function App() {
  const [meals, setMeals] = useState({
    isFetching: null,
    error: null,
    historyCheck: null,
    meals: [],
  });
  const [orderData, setOrderData] = useState({ items: [], customer: {} });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);

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

  // function to get Meal

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

  // function to increase Meal quantity

  const increaseItemQuantity = (item) => {
    setOrderData({
      ...orderData,
      items: orderData.items.map((meal) => {
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

  const decreaseItemQuantity = (item) => {
    if (item.quantity > 1) {
      setOrderData({
        ...orderData,
        items: orderData.items.map((meal) => {
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
      setOrderData({
        ...orderData,
        items: orderData.items.filter((meal) => meal.id !== item.id),
      });
    }
  };

  return (
    <div>
      <Modal open={meals.historyCheck}>
        <HistoryModal
          onClose={() => setMeals((prev) => ({ ...prev, historyCheck: false }))}
        />
      </Modal>
      <Modal
        open={checkout}
        data={orderData.items}
        onClose={() => setCheckout(false)}
      >
        <Checkout
          orderData={orderData}
          onSave={setOrderData}
          data={orderData.items}
          onClose={() => setCheckout(false)}
        />
      </Modal>
      <Modal data={orderData.orderItems} checkout={checkout} open={modalIsOpen}>
        <Cart
          onRemove={decreaseItemQuantity}
          onAdd={increaseItemQuantity}
          items={orderData.items}
          onClose={() => setModalIsOpen(false)}
          onCheckout={() => {
            setModalIsOpen(false);
            setCheckout(true);
          }}
          data={orderData.items}
          onReset={setOrderData}
        />
      </Modal>
      <Header
        onHistory={() => setMeals((prev) => ({ ...prev, historyCheck: true }))}
        data={orderData.items}
        onOpen={() => setModalIsOpen(true)}
      />
      <Meals
        loadingText={meals.isFetching ? "Loading Available Meals..." : null}
        fallBackText={meals.error ? "Error Loading Available Meals" : null}
        meals={meals.meals}
        onAdd={getItem}
      />
      <Reviews />
    </div>
  );
}

export default App;
