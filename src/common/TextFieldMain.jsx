function TextFieldMain({
  label,
  name,
  value,
  onChange,
  required = false,
  invalidMessage,
}) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-title text-label">
        {label}
      </label>
      <input
        required={required}
        onInvalid={(e) => e.target.setCustomValidity(invalidMessage)}
        onValid={(e) => e.target.setCustomValidity('')}
        autoComplete="off"
        className="textField__input_main"
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
export default TextFieldMain;
