function TextArea({ item }) {
  return (
    <>
      <label className="text-xs text-label" htmlFor={item.name}>
        {item.label}
      </label>
      <div>
        <textarea
          readOnly={true}
          name={item.name}
          className="border border-slate-400  text-sm p-2 mt-2 w-full sm:max-w-[430px]"
          rows={item.name === 'address' ? 5 : 7}
          cols={35}
          value={item.value}
        />
      </div>
    </>
  );
}

export default TextArea;
