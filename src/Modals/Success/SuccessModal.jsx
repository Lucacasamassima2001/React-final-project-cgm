/* eslint-disable react/prop-types */
import Button from "../../Button/Button";
import styles from "./SuccessModal.module.css";

export default function SuccessModal({ onClose }) {
  return (
    <div id={styles.success}>
      <h2>Success!</h2>
      <p>Your order was submitted succesfully.</p>
      <p>
        We will be back to you with more details via email within the next few
        minutes.
      </p>
      {/* <div>
        <img src="/DeliveryBoy.gif" alt="" />
      </div> */}
      <div className={styles.successAction}>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
