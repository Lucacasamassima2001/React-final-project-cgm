/* eslint-disable react/prop-types */
export default function Input({ labelText, onChange, inputType, inputName }) {
  return (
    <div>
      <label htmlFor={labelText}>{labelText}</label>
      <div className="control-row">
        <input
          required
          aria-required="true"
          onChange={onChange}
          name={inputName}
          type={inputType}
        />
      </div>
    </div>
  );
}
