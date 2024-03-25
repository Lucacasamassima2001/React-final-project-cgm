/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { fetchOrders } from "../../http";
import Button from "../../Button/Button";
import HistoryItems from "../../OrdersHistory/HistoryItems";
import { checkTotalPrice, showSelectedOrderItems } from "./History";
import styles from "./HistoryModal.module.css";
export default function HistoryModal({ onClose }) {
  const [customerOrders, setCustomerOrders] = useState({
    customerOrders: [],
    orderSelected: {},
  });

  useEffect(() => {
    async function fetchOrdersSended() {
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

    fetchOrdersSended();
  }, []);

  return (
    <div data-testid="history-modal" className={styles.historyModal}>
      <h2>History</h2>
      <div className={styles.historyContainer}>
        <div className={styles.ordersList}>
          {customerOrders.customerOrders?.length === 0 && <p>No orders yet</p>}

          <ul className={styles.orderUl}>
            {customerOrders.customerOrders?.map((order) => (
              <li key={order.id}>
                <Button
                  historyItem={true}
                  onClick={() =>
                    showSelectedOrderItems(
                      order.id,
                      setCustomerOrders,
                      customerOrders
                    )
                  }
                >
                  {order.id} - {checkTotalPrice(order).toFixed(2)}€ -{" "}
                  {order.customer.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.selectedOrder}>
          <h3>Selected Order</h3>
          <div className={styles.orderInfo}>
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
      <div className={styles.historyModalActions}>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
