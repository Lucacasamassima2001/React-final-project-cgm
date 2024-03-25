import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import styles from "./Modal.module.css";

function Modal({ open, children }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className={styles.modal} ref={dialog}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
