import TextArea from './TextArea';

function TextFieldView({ item }) {
  return (
    <>
      <label className="col-span-4 text-xs text-slate-400">{item.label}</label>
      <input
        readOnly={true}
        type="text"
        value={item.value}
        className="col-span-4 border-b-2 border-slate-400 text-sm mx-4 py-1"
      />
    </>
  );
}

export default TextFieldView;
