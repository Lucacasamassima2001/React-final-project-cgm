/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Header.module.css";

export default function Header({ onOpen, data, onHistory }) {
  return (
    <>
      <header id={styles.mainHeader}>
        <div id={styles.title}>
          <img src="/public/logo.jpg" alt="" />
          <h1>REACTFOOD</h1>
        </div>
      </header>
      <div id={styles.btnDetails}>
        <Button onClick={onHistory}>
          <i className="fa-solid fa-rectangle-list"></i>History
        </Button>
        <Button cartStyle="cart-btn" onClick={onOpen}>
          <i className="fa-solid fa-cart-shopping"></i>
          Cart ({data.length})
        </Button>
        <Link to="/Reviews">
          <Button>Reviews</Button>
        </Link>
      </div>
    </>
  );
}
