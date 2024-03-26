import Button from "../Button/Button";
import styles from "./Landing.module.css";
import { useState } from "react";
import Modal from "../Modals/Modal/Modal";
import Login from "../Modals/Login/Login";
import OrderContextProvider from "../store/food-order-context";

export default function Landing() {
  const [login, setLogin] = useState(false);

  return (
    <OrderContextProvider>
      <div className={styles.landing}>
        <div className={styles.landingContent}>
          <img className={styles.landingImg} src="/public/logo.jpg" alt="" />
          <h1>Welcome to REACTFOOD!</h1>
          <h2>Start your journey with us!</h2>

          <Button onClick={() => setLogin(true)}>Let`s Order!</Button>
          <Modal open={login} onClose={() => setLogin(false)}>
            <Login />
          </Modal>

          <div className={styles.landingText}>
            `Stop by our convenient location and experience the mouthwatering
            flavors of our fast food offerings. Our friendly staff is ready to
            serve you with a smile and ensure that your dining experience is
            nothing short of exceptional.`
          </div>
        </div>
        <div className={styles.opacity}></div>
      </div>
    </OrderContextProvider>
  );
}
