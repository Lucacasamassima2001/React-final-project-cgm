/* eslint-disable react/prop-types */
import Button from "../Button/Button";
import { useState } from "react";
import { updateUserOrder } from "../http";
import Input from "../Input/Input";
import styles from "./Checkout.module.css";

export default function Checkout({ orderData, data, onClose, onSave }) {
  const totalPrice = data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    street: "",
    ["postal-code"]: "",
    city: "",
  });

  // function to get customerData
  function getInputValues(e) {
    const { name, value } = e.target;
    const userData = { ...formData, [name]: value };
    setFormData(userData);
    onSave((prev) => ({ ...prev, customer: userData }));
  }

  function checkInputValues() {
    if (
      formData.email === "" ||
      !formData.email.includes("@") ||
      formData.name === "" ||
      formData.street === "" ||
      formData["postal-code"] === "" ||
      formData.city === ""
    ) {
      return false;
    }
    return true;
  }

  // function to send order to db

  async function handleSave(e) {
    e.preventDefault();
    checkInputValues();
    if (checkInputValues()) {
      try {
        await updateUserOrder(orderData);
      } catch (error) {
        console.log(error);
      } finally {
        onSave({ items: [], customer: {} });
        setSuccess(true);
      }
    } else {
      console.log("not valid");
      setError(true);
    }
  }

  function resetForm() {
    document.getElementById("form").reset();
    setError(false);
  }

  return (
    <div id="checkout">
      {success ? (
        <div>
          <h2>Success!</h2>
          <p>Your order was submitted succesfully.</p>
          <p>
            We will be back to you with more details via email within the next
            few minutes.
          </p>
          <div className="modal-actions">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Checkout</h2>
          <p>Total Price: {formattedTotalPrice}</p>
          <form id="form" onSubmit={handleSave}>
            <div className={styles.control}>
              <Input
                error={error && formData.name === ""}
                onChange={getInputValues}
                labelText={"Full-name"}
                inputName={"name"}
                inputType={"text"}
                placeholderText={
                  error && formData.name === ""
                    ? "Please enter your name..."
                    : ""
                }
              />

              <Input
                error={error && formData.email === ""}
                onChange={getInputValues}
                labelText={"E-Mail address"}
                inputName={"email"}
                inputType={"email"}
                placeholderText={
                  error && formData.email === ""
                    ? "Please enter your email..."
                    : ""
                }
              />
              <Input
                error={error && formData.street === ""}
                onChange={getInputValues}
                labelText={"Street address"}
                inputName={"street"}
                inputType={"text"}
                placeholderText={
                  error && formData.street === ""
                    ? "Please insert your street..."
                    : ""
                }
              />

              <Input
                error={error && formData["postal-code"] === ""}
                onChange={getInputValues}
                labelText={"Postal code"}
                inputName={"postal-code"}
                inputType={"number"}
                placeholderText={
                  error && formData["postal-code"] === ""
                    ? "Please enter your postal code..."
                    : ""
                }
              />

              <Input
                error={error && formData.city === ""}
                onChange={getInputValues}
                labelText={"City"}
                inputName={"city"}
                inputType={"text"}
                placeholderText={
                  error && formData.city === ""
                    ? "Please enter your city..."
                    : ""
                }
              />
            </div>
            <div className={styles.modalActions}>
              <Button>Submit Order</Button>
            </div>
          </form>
          <Button id={styles.closeBtn} onClick={onClose}>
            Close
          </Button>
          <Button onClick={resetForm}>Reset</Button>
        </div>
      )}
    </div>
  );
}
