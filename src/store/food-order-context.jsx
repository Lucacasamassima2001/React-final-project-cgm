/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const OrderContext = createContext({
  userCtx: [],
  setUserCtx: () => {},
});

export default function OrderContextProvider({ children }) {
  const [user, setUser] = useState({});

  const ctxValue = {
    userCtx: user,
    setUserCtx: setUser,
  };

  return (
    <OrderContext.Provider value={ctxValue}>{children}</OrderContext.Provider>
  );
}
