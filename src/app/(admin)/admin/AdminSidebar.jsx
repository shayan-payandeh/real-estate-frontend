'use client';
import Link from 'next/link';
import {
  MdAddHome,
  MdCategory,
  MdDashboard,
  MdRealEstateAgent,
  MdTypeSpecimen,
  MdOutlineDangerous,
  MdLocationOn,
} from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import { logout } from '@/services/authService';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { toPersianNumbers } from '@/utils/toPersianNumbers';
import { useGetPropertyRequests } from '@/hooks/usePropertyRequests';
import { IoIosArchive } from 'react-icons/io';

const navbarItems = [
  {
    id: 1,
    title: 'صفحه اصلی',
    address: '/',
    icon: <MdAddHome className="dynamicIcon" />,
  },
  {
    id: 2,
    title: 'پنل مدیریت',
    address: '/admin',
    icon: <MdDashboard className="dynamicIcon " />,
  },
  {
    id: 3,
    title: 'درخواست ها',
    address: '/admin/propertyRequests',
    icon: <MdRealEstateAgent className="dynamicIcon " />,
    badge: true,
  },
  {
    id: 4,
    title: 'کاربری ها',
    address: '/admin/categories',
    icon: <MdCategory className="dynamicIcon " />,
  },
  {
    id: 5,
    title: 'خدمات',
    address: '/admin/propertyTypes',
    icon: <MdTypeSpecimen className=" dynamicIcon " />,
  },
  {
    id: 6,
    title: 'مناطق',
    address: '/admin/locations',
    icon: <MdLocationOn className=" dynamicIcon" />,
  },
  {
    id: 7,
    title: 'بایگانی',
    address: '/admin/archive',
    icon: <IoIosArchive className=" dynamicIcon" />,
  },
];
function AdminSidebar({ pathname, status }) {
  const query = 'isChecked=false';
  const { data, isLoading } = useGetPropertyRequests(query);
  const { propertyRequests } = data || {};
  const { totalDocs } = propertyRequests || {};

  const logoutHandler = async () => {
    const loggingout = async () => {
      await logout();
      document.location.href = '/';
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-slate-50 px-10 py-6 border-2 shadow-lg">
            {/* <h1>Are you sure?</h1> */}
            <div className="flex justify-center">
              <MdOutlineDangerous color="rgb(51 65 85)" size={28} />
            </div>
            <div className="mt-[20px]">
              <p>آیا می خواهید از حساب خود خارج شوید ؟</p>
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
                  loggingout();
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
  return (
    <nav>
      <ul className="flex flex-col p-0">
        {navbarItems.map((item) => (
          <Link
            key={item.id}
            href={item.address}
            className="border-b border-slate-800  last:border-b-0"
          >
            <li
              key={item.id}
              className={`flex items-center px-[25px] sm:px-[29.2px] md:px-[28.4px] lg:px-[28px] py-[.9rem]  hover:bg-slate-800  ${
                pathname === item.address
                  ? ' bg-slate-800 text-blue-200 font-bold'
                  : ''
              }`}
            >
              <span className="relative ">
                <span>{item.icon}</span>
                {item.badge && !isLoading && totalDocs > 0 && (
                  <span
                    className="absolute rounded-[10px] whitespace-nowrap  top-0 right-0 -mr-[10px] -mt-[6px] min-w-[10px] py-[3px] px-[7px] text-[12px] text-center  inline-block  bg-slate-400 text-slate-800"
                    style={{
                      fontWeight: '700',
                      lineHeight: '1',
                      whiteSpace: 'nowrap',
                      verticalAlign: 'baseline',
                    }}
                  >
                    {toPersianNumbers(totalDocs)}
                  </span>
                )}
              </span>
              <span
                className={`items-center transition-all duration-700 mr-[12px] ${
                  status
                    ? 'block opacity-100'
                    : ' opacity-0 text-[.0000000000000001rem]'
                }`}
              >
                <span>{item.title}</span>
              </span>

              {/* {status && item.badge && !isLoading && totalDocs > 0 && (
                <div className="fadeAnimate  bg-slate-400  justify-center items-center  text-sm text-gray-800   px-2.5 py-0.5 rounded-full mr-3">
                  {toPersianNumbers(totalDocs)}
                </div> */}
              {/* )} */}
            </li>
          </Link>
        ))}
        <li
          onClick={logoutHandler}
          className="cursor-pointer flex items-center px-[25px]  sm:px-[29.2px] md:px-[28.4px] lg:px-[28px] py-[.9rem]  hover:bg-slate-800  "
        >
          <span className="relative">
            <span>
              <BiLogOut className="dynamicIcon" />
            </span>
          </span>
          <span
            className={`items-center transition-all duration-700 mr-[12px] ${
              status
                ? 'block opacity-100'
                : ' opacity-0 text-[.0000000000000001rem]'
            }`}
          >
            <span>خروج از حساب</span>
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default AdminSidebar;
