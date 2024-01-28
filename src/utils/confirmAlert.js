import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdOutlineDangerous } from 'react-icons/md';

export const alertConfirm = async (action) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="bg-slate-50 px-10  py-4 border-2 shadow-lg">
          <div className="flex justify-center">
            <MdOutlineDangerous color="rgb(51 65 85)" size={28} />
          </div>
          <div className="mt-[20px]">
            <p>از حذف این آیتم مطمئن هستید ؟</p>
          </div>
          <div className="flex justify-around mt-6">
            <button
              className="border-2 px-8 py-1 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all ease-in"
              onClick={onClose}
            >
              خیر
            </button>
            <button
              className="border-2 px-8 py-1 bg-slate-700 text-slate-100 rounded-lg hover:bg-slate-500 transition-all ease-in"
              onClick={() => {
                action();
                onClose();
              }}
            >
              بله
            </button>
          </div>
        </div>
      );
    },
  });
};
