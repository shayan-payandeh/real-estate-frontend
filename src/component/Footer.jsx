import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="px-10 py-10  bg-gray-900">
      <div className="gap-10 flex flex-col md:flex-row md: justify-between max-w-7xl m-auto">
        <div>
          <div className="text-white mb-2 text-title">لینک ها :</div>
          <div className="text-gray-400 p-2 text-context">
            <Link href={'/'}>صفحه اصلی</Link>
          </div>
          <div className="text-gray-400 p-2 text-context">
            <Link href={'/request'}>مشاوره</Link>
          </div>
          <div className="text-gray-400 p-2 text-context">
            <Link href={'/about'}>درباره ما</Link>
          </div>
          <div className="text-gray-400 p-2 text-context">
            <Link href={'/properties'}>املاک</Link>
          </div>
        </div>
        <div>
          <div className="text-white mb-2 text-title">ارتباط با ما :</div>
          <div className="text-gray-400 p-2 text-context">
            شماره تماس : 09361732220
          </div>
        </div>
        <div>
          <div className="text-white mb-2 text-title">شبکه های اجتماعی :</div>
          <div className="text-gray-400 p-2 text-context flex gap-4">
            <Link href={'https://www.instagram.com/hormozgan.file/'}>
              <FaInstagram size={18} />
            </Link>
            <FaTelegram size={18} />
            <FaWhatsapp size={18} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
