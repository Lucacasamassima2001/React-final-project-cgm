/* eslint-disable react/prop-types */
import Button from "../../Button/Button";
import { useState } from "react";
import { updateUserOrder } from "../../http";
import Input from "../../Input/Input";
import SuccessModal from "../Success/SuccessModal";
import styles from "./Checkout.module.css";
export default function Checkout({ orderData, onClose, onSave }) {
  const totalPrice = orderData.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  const [outCome, setOutCome] = useState({
    success: false,
    error: false,
  });
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
        setOutCome((prev) => ({ ...prev, success: true }));
      }
    } else {
      console.log("not valid");
      setOutCome({ success: false, error: true });
    }
  }

  function resetForm() {
    document.getElementById("form").reset();
    setOutCome({ success: false, error: false });
  }

  return (
    <div>
      {outCome.success ? (
        <SuccessModal onClose={onClose} />
      ) : (
        <div>
          <h2>Checkout</h2>
          <p>Total Price: {formattedTotalPrice}</p>
          <form id="form" onSubmit={handleSave}>
            <div className={styles.control}>
              <Input
                error={outCome.error && formData.name === ""}
                onChange={getInputValues}
                labelText={"Full-name"}
                inputName={"name"}
                inputType={"text"}
                placeholderText={
                  outCome.error && formData.name === ""
                    ? "Please enter your name..."
                    : ""
                }
              />

              <Input
                error={outCome.error && formData.email === ""}
                onChange={getInputValues}
                labelText={"E-Mail address"}
                inputName={"email"}
                inputType={"email"}
                placeholderText={
                  outCome.error && formData.email === ""
                    ? "Please enter your email..."
                    : ""
                }
              />
              <Input
                error={outCome.error && formData.street === ""}
                onChange={getInputValues}
                labelText={"Street address"}
                inputName={"street"}
                inputType={"text"}
                placeholderText={
                  outCome.error && formData.street === ""
                    ? "Please insert your street..."
                    : ""
                }
              />

              <Input
                error={outCome.error && formData["postal-code"] === ""}
                onChange={getInputValues}
                labelText={"Postal code"}
                inputName={"postal-code"}
                inputType={"number"}
                placeholderText={
                  outCome.error && formData["postal-code"] === ""
                    ? "Please enter your postal code..."
                    : ""
                }
              />

              <Input
                error={outCome.error && formData.city === ""}
                onChange={getInputValues}
                labelText={"City"}
                inputName={"city"}
                inputType={"text"}
                placeholderText={
                  outCome.error && formData.city === ""
                    ? "Please enter your city..."
                    : ""
                }
              />
            </div>
            <div className={styles.modalActions}>
              <Button>Submit Order</Button>
            </div>
          </form>
          <div className={styles.modalBackActions}>
            <Button id="close-btn" onClick={onClose}>
              Close
            </Button>
            <Button onClick={resetForm}>Reset</Button>
          </div>
        </div>
      )}
    </div>
  );
}
