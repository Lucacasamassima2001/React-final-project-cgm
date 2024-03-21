/* eslint-disable react/prop-types */
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
          className={error ? "control-row-error" : "control-row"}
          onChange={onChange}
          name={inputName}
          type={inputType}
          placeholder={placeholderText}
        />
      </div>
    </div>
  );
}
