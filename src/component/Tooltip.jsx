import { Tooltip as Tool } from '@material-tailwind/react';

function Tooltip({ children, content }) {
  return (
    <Tool
      className="bg-slate-900 text-white py-1 px-2 text-[12px] rounded-sm"
      content={content}
      placement="top"
    >
      {children}
    </Tool>
  );
}

export default Tooltip;
