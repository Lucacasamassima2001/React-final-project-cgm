import Button from "../Button/Button";

export default function HistoryItems({ item }) {
  return (
    <div className="order-items-container">
      <div>
        {item.quantity} x {item.name} - {item.price}€
      </div>
      <div>
        <img src={`http://localhost:3000/${item.image}`} alt="" />
      </div>
    </div>
  );
}
