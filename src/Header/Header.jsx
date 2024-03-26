/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Modal from "../Modals/Modal/Modal";
import HistoryModal from "../Modals/History/HistoryModal";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header({ onOpen, data, user, setLogout }) {
  const [historyCheck, setHistoryCheck] = useState(false);

  return (
    <header id={styles.mainHeader}>
      <Modal open={historyCheck}>
        <HistoryModal onClose={() => setHistoryCheck(false)} />
      </Modal>
      <div id={styles.title}>
        <Link to="/Home">
          <img src="/public/logo.jpg" alt="" />
        </Link>
        <h1>REACTFOOD</h1>
      </div>

      <div id={styles.btnDetails}>
        {user.name === "Bruno Laria" ? (
          <Button onClick={() => setHistoryCheck(true)}>
            <i className="fa-solid fa-rectangle-list"></i>History
          </Button>
        ) : null}
        <Button cartStyle="cart-btn" onClick={onOpen}>
          <i className="fa-solid fa-cart-shopping"></i>
          Cart ({data.length})
        </Button>
        <Link to="/">
          <Button onClick={setLogout}>Logout</Button>
        </Link>
        <Link to="/Reviews">
          <Button>Reviews</Button>
        </Link>
      </div>
    </header>
  );
}
