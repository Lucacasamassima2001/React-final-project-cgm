/* eslint-disable react/prop-types */

export default function Button({
  children,
  onClick,
  historyItem,
  cartStyle,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={historyItem ? "history-button" : "button"}
      id={cartStyle ? "cart-btn" : ""}
      {...props}
    >
      {children}
    </button>
  );
}
