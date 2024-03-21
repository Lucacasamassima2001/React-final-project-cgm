/* eslint-disable react/prop-types */
export default function Button({ children, onClick, historyItem }) {
  return (
    <button
      onClick={onClick}
      className={historyItem ? "history-button" : "button"}
    >
      {children}
    </button>
  );
}
