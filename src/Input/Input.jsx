/* eslint-disable react/prop-types */
import styles from "./Input.module.css";

export default function Input({
  labelText,
  onChange,
  inputType,
  inputName,
  error,
  placeholderText,
}) {
  return (
    <div>
      <label htmlFor={labelText}>{labelText}</label>
      <div className={"control-row"}>
        <input
          className={
            error ? `${styles.controlRowError}` : `${styles.controlRow}`
          }
          onChange={onChange}
          name={inputName}
          type={inputType}
          placeholder={placeholderText}
        />
      </div>
    </div>
  );
}
