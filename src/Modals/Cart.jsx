/* eslint-disable react/prop-types */
import Button from "../Button/Button";

export default function Cart({
  items,
  onAdd,
  onRemove,
  onClose,
  data,
  onCheckout,
  onReset,
}) {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  function resetOrder() {
    onReset({ items: [], customer: {} });
  }

  return (
    <div className="cart">
      <h2>Your Cart:</h2>
      {items.length === 0 ? <h4>No items in cart...</h4> : null}
      <ul>
        {items.map((item) =>
          item.quantity > 0 ? (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - {item.quantity} x ${item.price}
              </p>
              <div className="cart-item-actions">
                <Button onClick={() => onRemove(item)}>
                  <span>-</span>
                </Button>
                {item.quantity}
                <Button onClick={() => onAdd(item)}>
                  <span>+</span>
                </Button>
              </div>
            </li>
          ) : null
        )}
      </ul>
      <div className="cart-total">Total: {formattedTotalPrice}</div>
      <div className="modal-actions">
        {data.length > 0 ? <Button onClick={resetOrder}>Reset</Button> : null}
        <Button onClick={onClose}>Close</Button>
        {data.length > 0 ? (
          <Button onClick={onCheckout}>Go to Checkout</Button>
        ) : null}
      </div>
    </div>
  );
}
