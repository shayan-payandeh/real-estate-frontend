function TextField({ label, name, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-title text-label">
        {label}
      </label>
      <input
        autoComplete="off"
        className="text-[12px] max-h-[27.6px] max-w-[200px] sm:max-w-none w-full py-1 px-1 rounded-lg bg-slate-200 text-secondary-900 border border-slate-400 outline-none duration-200 transition-all ease-in-out hover:border-slate-700 focus:outline-none focus:border-slate-800 focus:shadow-md focus:shadow-slate-400"
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
export default TextField;
