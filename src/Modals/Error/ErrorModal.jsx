/* eslint-disable react/prop-types */
import Button from "../../Button/Button";

export default function SuccessModal({ onClose }) {
  return (
    <div>
      <h2>Error!</h2>
      <p>Something went bad... :(</p>
      <p>Please fill all the camps!</p>
      <div className="modal-actions">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
