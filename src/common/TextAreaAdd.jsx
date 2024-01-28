function TextAreaAdd({ item, handleChange }) {
  return (
    <>
      <label className="text-sm text-label" htmlFor={item.name}>
        {item.label}
      </label>
      <div>
        <textarea
          name={item.name}
          className="textArea__input mt-2  sm:max-w-[430px]"
          rows={5}
          cols={35}
          value={item.value || ''}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default TextAreaAdd;
