import Header from "./Header/Header";
import Meals from "./Meals/Meals";
import { useContext, useState } from "react";
import Modal from "./Modals/Modal/Modal";
import Cart from "./Modals/Cart/Cart.jsx";
import Checkout from "./Modals/Checkout/Checkout";
import { OrderContext } from "./store/food-order-context.jsx";
function App() {
  const { userCtx, setUserCtx } = useContext(OrderContext);
  const [orderData, setOrderData] = useState({ items: [], customer: {} });
  const [modalIsOpen, setModalIsOpen] = useState({
    open: false,
    checkout: false,
  });

  function logout() {
    setUserCtx({ name: "", password: "", admin: false, isLogged: false });
  }
  console.log(userCtx);
  return (
    <div>
      <Modal
        open={modalIsOpen.checkout}
        data={orderData.items}
        onClose={() => setModalIsOpen({ ...modalIsOpen, checkout: false })}
      >
        <Checkout
          orderData={orderData}
          onSave={setOrderData}
          onClose={() => setModalIsOpen({ ...modalIsOpen, checkout: false })}
        />
      </Modal>
      <Modal
        data={orderData.orderItems}
        checkout={modalIsOpen.checkout}
        open={modalIsOpen.open}
      >
        <Cart
          orderData={orderData}
          setOrderData={setOrderData}
          items={orderData.items}
          onClose={() => setModalIsOpen(false)}
          onCheckout={() => {
            setModalIsOpen({ open: false, checkout: true });
          }}
        />
      </Modal>
      <Header
        setLogout={logout}
        user={userCtx}
        data={orderData.items}
        onOpen={() => setModalIsOpen((prev) => ({ ...prev, open: true }))}
      />
      <Meals orderData={orderData} setOrderData={setOrderData} />
    </div>
  );
}

export default App;
