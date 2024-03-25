// History functions

export const checkTotalPrice = (order) => {
  let total = 0;
  order.items.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};

export const showSelectedOrderItems = (
  id,
  setCustomerOrders,
  customerOrders
) => {
  const selectedOrder = customerOrders.customerOrders.find(
    (order) => order.id === id
  );
  setCustomerOrders((prev) => {
    return {
      ...prev,
      orderSelected: selectedOrder,
    };
  });
};
