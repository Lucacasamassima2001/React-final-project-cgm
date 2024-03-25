/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { fetchOrders } from "../http";
import Button from "../Button/Button";
import HistoryItems from "../OrdersHistory/HistoryItems";
export default function HistoryModal({ onClose }) {
  const [customerOrders, setCustomerOrders] = useState({
    customerOrders: [],
    orderSelected: {},
  });
  function checkTotalPrice(order) {
    let total = 0;
    order.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  function showSelectedOrderItems(id) {
    const selectedOrder = customerOrders.customerOrders.find(
      (order) => order.id === id
    );
    setCustomerOrders((prev) => {
      return {
        ...prev,
        orderSelected: selectedOrder,
      };
    });
  }

  useEffect(() => {
    async function fetchMeals() {
      try {
        const orders = await fetchOrders();
        setCustomerOrders((prev) => {
          return {
            ...prev,
            customerOrders: orders,
          };
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchMeals();
  }, []);

  return (
    <div data-testid="history-modal" className="history-modal">
      <h2>History</h2>
      <div className="history-container">
        <div className="orders-list">
          {customerOrders.customerOrders?.length === 0 && <p>No orders yet</p>}

          <ul className="order-ul">
            {customerOrders.customerOrders?.map((order) => (
              <li key={order.id}>
                <Button
                  historyItem={true}
                  onClick={() => showSelectedOrderItems(order.id)}
                >
                  {order.id} - {checkTotalPrice(order).toFixed(2)}€ -{" "}
                  {order.customer.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="selected-order">
          <h3>Selected Order</h3>
          <div className="order-info">
            <h4>
              {customerOrders.orderSelected?.id
                ? customerOrders.orderSelected.id
                : null}
            </h4>
            <h4>
              {customerOrders.orderSelected?.customer
                ? customerOrders.orderSelected.customer.name
                : null}
            </h4>
            <h4>
              {customerOrders.orderSelected?.id
                ? checkTotalPrice(customerOrders.orderSelected).toFixed(2) + "€"
                : null}
            </h4>
          </div>
          {customerOrders.orderSelected.id
            ? customerOrders.orderSelected.items?.map((item) => (
                <HistoryItems key={item.id} item={item} />
              ))
            : "No order selected..."}
        </div>
      </div>
      <div className="history-modal-actions">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
