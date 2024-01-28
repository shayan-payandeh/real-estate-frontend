'use client';
import { menuItems } from '@/constant/menuItems';
import { useGetProfile } from '@/hooks/useAuth';
import Link from 'next/link';

function Nav({ pathname }) {
  const { isLoading, data } = useGetProfile();

  return (
    <nav
      className={`text-menuTitle ${
        isLoading ? 'blur-sm opacity-80' : 'opacity-100 blur-0'
      }  border-b-2  py-8  items-center px-5 h-14 w-full z-[10000]  hidden lg:flex  ${
        pathname === '/'
          ? 'bg-transparent  text-white border-gray-600'
          : 'bg-slate-50 text-slate-900 shadow-xl'
      }`}
    >
      <div className="w-[33.3%]">
        <div className="w-[14%]">
          <Link href="/">
            <img src="/images/logo_main_3.png" alt="picture" width="60" />
          </Link>
        </div>
      </div>
      <ul className="w-[66.6%]  flex gap-16 justify-center items-center absolute  left-0 right-0 m-auto">
        {menuItems.map((item) => (
          <li
            className={`${
              item.to === pathname
                ? 'text-[#d7a65d]  border-b-2 border-[#d7a56d]'
                : ''
            } hover:text-[#d7a65d] transition-all duration-600`}
            key={item.id}
          >
            <Link href={item.to}>{item.title}</Link>
          </li>
        ))}
        {data?.statusCode === 200 ? (
          <li className={` hover:text-[#d7a65d] transition-all duration-600`}>
            <Link href={'/admin'}> {'مدیریت'}</Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
