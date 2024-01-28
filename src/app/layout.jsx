'use client';
import vazirFont from '@/constant/localFonts';
import './globals.css';
import { usePathname } from 'next/navigation';
import Nav from '@/component/Nav';
import Providers from './Providers';
import { Toaster } from 'react-hot-toast';
import Footer from '@/component/Footer';
import NavMobile from '@/component/NavMobile';
import bg from '../../public/images/main_7.jpg';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="fa" dir="rtl">
      <body
        suppressContentEditableWarning={true}
        suppressHydrationWarning={true}
        // className={`${vazirFont.variable} font-sans`}
      >
        <Providers>
          <Toaster />
          <div
            className=""
            style={
              pathname === '/'
                ? {
                    backgroundPosition: 'center center',
                    backgroundImage: `url(${bg.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width: '100%',
                    minHeight: '100vh',
                  }
                : {}
            }
          >
            {!pathname.includes('admin') && !pathname.includes('auth') && (
              <Nav pathname={pathname} />
            )}
            {!pathname.includes('auth') && !pathname.includes('admin') && (
              <NavMobile pathname={pathname} />
            )}
            <div className="min-h-screen"> {children}</div>
          </div>
          <div>
            {!pathname.includes('admin') && !pathname.includes('auth') && (
              <Footer />
            )}
          </div>
        </Providers>
      </body>
    </html>
  );
}
