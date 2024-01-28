'use client';
import { Toaster } from 'react-hot-toast';
import '../../globals.css';
import AdminSidebar from './AdminSidebar';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  const openMenuHandler = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Toaster />
      <div
        className={`flex relative h-screen ${
          pathname === '/admin' ? 'bg-gray-100' : ''
        }`}
      >
        <div
          className={`absolute top-0 right-0 h-screen py-3 z-30 bg-slate-900 text-slate-100 rounded-e-2xl transition-all duration-700 ease-in-out ${
            isOpen ? 'w-[220px] sm:w-[260px]' : 'w-[70px] sm:w-[80px]'
          } `}
        >
          <div
            className={`flex py-6 px-2 border-b border-slate-700  ${
              isOpen ? 'justify-end' : 'justify-center'
            }`}
            onClick={openMenuHandler}
          >
            <span>
              <IoIosArrowBack
                className={`transition-all duration-700 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </span>
          </div>
          <AdminSidebar pathname={pathname} status={isOpen} />
        </div>
        <section
          className={` transition-all duration-700 ease-in-out flex-grow overflow-y-auto py-7 px-4 ${
            isOpen
              ? 'sm:mr-[260px]  opacity-10 md:opacity-100'
              : 'mr-[70px] sm:mr-[80px] '
          }`}
        >
          {children}
        </section>
      </div>
    </>
  );
}
