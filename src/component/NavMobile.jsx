'use client';
import { menuItems } from '@/constant/menuItems';
import Link from 'next/link';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import Hamburger from 'hamburger-react';
import { useGetProfile } from '@/hooks/useAuth';

function NavMobile({ pathname }) {
  const { isLoading, data } = useGetProfile();

  const AccordionItem = ({ header, ...rest }) => (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <div className="flex justify-between ">
          <span className="">
            <Hamburger
              toggled={isEnter}
              size={20}
              easing="ease-in"
              distance="sm"
            />
          </span>
          <span className=" flex items-center">
            <Link href="/">
              <img src="/images/logo_main_3.png" alt="picture" width="45" />
            </Link>
          </span>
        </div>
      )}
      className={`shadow-md   ${
        pathname === '/'
          ? 'bg-transparent  text-white '
          : 'bg-gray-100 text-slate-900 shadow-xl'
      }  `}
      contentProps={{
        className: 'transition-height duration-500 ease-out bg-white',
      }}
      panelProps={{ className: '' }}
      buttonProps={{ className: ({ isEnter }) => `py-2 px-2 w-full` }}
    />
  );

  return (
    <Accordion transition className="lg:hidden">
      <AccordionItem>
        <nav
          style={
            pathname === '/'
              ? {
                  background:
                    'linear-gradient(90deg, hsla(222, 11%, 24%, 1) 0%, hsla(218, 24%, 20%, 1) 100%)',
                }
              : {}
          }
          className={`w-full  lg:hidden ${
            pathname === '/'
              ? 'text-white '
              : 'bg-slate-50 text-slate-900 shadow-xl'
          }`}
        >
          <ul className="flex flex-col justify-center items-center text-menuTitle">
            {menuItems.map((item) => (
              <li
                className={`${
                  data?.statusCode === 200 ? '' : 'last:border-b-0'
                } w-full py-4  text-center border-b border-[#878787] ${
                  item.to === pathname ? 'text-[#d7a65d]  ' : ''
                } hover:text-[#d7a65d] transition-all duration-600`}
                key={item.id}
              >
                <Link href={item.to}>{item.title}</Link>
              </li>
            ))}
            {data?.statusCode === 200 ? (
              <li
                className={`py-4 text-center hover:text-[#d7a65d] transition-all duration-600`}
              >
                <Link href={'/admin'}> {'مدیریت'}</Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </AccordionItem>
    </Accordion>
  );
}

export default NavMobile;
