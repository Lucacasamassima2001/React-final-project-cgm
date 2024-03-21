import Button from "../Button/Button";

export default function Header({ onOpen, data, onHistory }) {
  return (
    <header id="main-header">
      <div id="title">
        <img src="/public/logo.jpg" alt="" />
        <h1>REACTFOOD</h1>
      </div>
      <Button className="history-btn button" onClick={onHistory}>
        <i className="fa-solid fa-rectangle-list"></i>History
      </Button>
      <Button cartStyle="cart-btn" onClick={onOpen}>
        <i className="fa-solid fa-cart-shopping"></i>
        Cart ({data.length})
      </Button>
      <p></p>
    </header>
  );
}
