/* eslint-disable react/prop-types */
import Button from "../../Button/Button";

export default function SuccessModal({ onClose }) {
  return (
    <div>
      <h2>Success!</h2>
      <p>Your order was submitted succesfully.</p>
      <p>
        We will be back to you with more details via email within the next few
        minutes.
      </p>
      <div className="modal-actions">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
