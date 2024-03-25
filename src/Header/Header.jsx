/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Modal from "../Modals/Modal/Modal";
import HistoryModal from "../Modals/History/HistoryModal";
import { useState } from "react";

export default function Header({ onOpen, data }) {
  const [historyCheck, setHistoryCheck] = useState(false);

  return (
    <header id="main-header">
      <Modal open={historyCheck}>
        <HistoryModal onClose={() => setHistoryCheck(false)} />
      </Modal>
      <div id="title">
        <Link to="/Home">
          <img src="/public/logo.jpg" alt="" />
        </Link>
        <h1>REACTFOOD</h1>
      </div>

      <div className="btn-details">
        <Button
          className="history-btn button"
          onClick={() => setHistoryCheck(true)}
        >
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
    </header>
  );
}
