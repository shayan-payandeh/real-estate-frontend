import { existenceOptions } from '@/constant/requestLabel';

function Select({ onChange, options, name, defaultValue, label, isTruthy }) {
  const finalOptions = isTruthy ? existenceOptions : options;
  return (
    <>
      <label htmlFor={name} className="block mb-2 text-title text-label">
        {label}
      </label>
      <select
        autoComplete="off"
        name={name}
        className="text-[12px] max-h-[27.6px] max-w-[200px] sm:max-w-none w-full py-1 px-1 rounded-lg bg-slate-200 text-secondary-900 border border-slate-400 outline-none duration-200 transition-all ease-in-out hover:border-slate-700 focus:outline-none focus:border-slate-800 focus:shadow-md focus:shadow-slate-400"
        onChange={onChange}
        defaultValue={defaultValue}
      >
        <option> یک گزینه را انتخاب کنید</option>
        {finalOptions.map((item) => (
          <option
            key={isTruthy ? item.id : item._id}
            value={isTruthy ? item.value : item._id}
          >
            {item.title || item.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
