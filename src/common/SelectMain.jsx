import { existenceOptions } from '@/constant/requestLabel';

function SelectMain({
  onChange,
  options,
  name,
  defaultValue,
  label,
  isTruthy,
}) {
  const finalOptions = isTruthy ? existenceOptions : options;
  return (
    <>
      <label htmlFor={name} className="block mb-2 text-title text-label">
        {label}
      </label>
      <select
        autoComplete="off"
        name={name}
        className="textField__input_main "
        onChange={onChange}
        defaultValue={defaultValue}
      >
        <option>لطفا یک گزینه را انتخاب کنید</option>
        {finalOptions.map((item) => (
          <option
            key={isTruthy ? item.id : item._id}
            value={isTruthy ? item.value : item._id}
          >
            {item.title}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectMain;
