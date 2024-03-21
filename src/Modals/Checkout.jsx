/* eslint-disable react/prop-types */
import Button from "../Button/Button";
import { useState } from "react";
import { updateUserOrder } from "../http";
import Input from "../Input/Input";
export default function Checkout({ orderData, data, onClose, onSave }) {
  const totalPrice = data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  const [success, setSuccess] = useState(false);

  let nameNotValid = orderData.customer.name === "";
  console.log(nameNotValid);

  // function to get customerData
  function getInputValues(e) {
    const { name, value } = e.target;

    onSave((prev) => {
      return {
        ...prev,
        customer: {
          ...prev.customer,
          [name]: value,
        },
      };
    });
  }

  // function to send order to db

  async function handleSave(e) {
    e.preventDefault();

    if (nameNotValid) {
      console.log("name not valid");
    } else {
      try {
        await updateUserOrder(orderData);
      } catch (error) {
        console.log(error);
      } finally {
        onSave({ items: [], customer: {} });
        setSuccess(true);
      }
    }
  }

  function resetForm() {
    document.getElementById("form").reset();
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
            <div className="control">
              <Input
                error={nameNotValid ? true : false}
                labelText={"Full-name"}
                onChange={getInputValues}
                inputName={"name"}
                inputType={"text"}
              />
              <Input
                labelText={"E-Mail address"}
                onChange={getInputValues}
                inputName={"email"}
                inputType={"email"}
              />
              <Input
                labelText={"Street address"}
                onChange={getInputValues}
                inputName={"street"}
                inputType={"text"}
              />
              <Input
                labelText={"Postal code"}
                onChange={getInputValues}
                inputName={"postal-code"}
                inputType={"number"}
              />
              <Input
                labelText={"City"}
                onChange={getInputValues}
                inputName={"city"}
                inputType={"text"}
              />
            </div>
            <div className="modal-actions">
              <Button>Submit Order</Button>
            </div>
          </form>
          <Button id="close-btn" onClick={onClose}>
            Close
          </Button>
          <Button onClick={resetForm}>Reset</Button>
        </div>
      )}
    </div>
  );
}
