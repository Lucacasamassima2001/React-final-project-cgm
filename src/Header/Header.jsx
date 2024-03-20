import Button from "../Button/Button";

export default function Header({ onOpen, data, onHistory }) {
  return (
    <header id="main-header">
      <div id="title">
        <img src="/public/logo.jpg" alt="" />
        <h1>REACTFOOD</h1>
      </div>
      <Button onClick={onHistory}>History</Button>
      <Button onClick={onOpen}>Cart ({data.length})</Button>
    </header>
  );
}
