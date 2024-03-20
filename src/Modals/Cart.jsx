import Button from "../Button/Button";

export default function Cart({
  items,
  onAdd,
  onRemove,
  onClose,
  data,
  onCheckout,
}) {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div className="cart">
      <h2>Your Cart:</h2>
      <ul>
        {items.map((item) =>
          item.quantity > 0 ? (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - {item.quantity} x ${item.price}
              </p>
              <div className="cart-item-actions">
                <Button onClick={() => onRemove(item)}>-</Button>
                {item.quantity}
                <Button onClick={() => onAdd(item)}>+</Button>
              </div>
            </li>
          ) : null
        )}
      </ul>
      <div className="cart-total">Total: {formattedTotalPrice}</div>
      <div className="modal-actions">
        <Button onClick={onClose}>Close</Button>
        {data.length > 0 ? (
          <Button onClick={onCheckout}>Go to Checkout</Button>
        ) : null}
      </div>
    </div>
  );
}
