// eslint-disable-next-line no-unused-vars
import Button from "../Button/Button";
import styles from "./HistoryItems.module.css";

export default function HistoryItems({ item }) {
  return (
    <div className={styles.orderItemsContainer}>
      <div>
        {item.quantity} x {item.name} - {item.price}€
      </div>
      <div>
        <img src={`http://localhost:3000/${item.image}`} alt="" />
      </div>
    </div>
  );
}
