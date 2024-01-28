'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: '100%',
        minHeight: '100vh',
        zIndex: '1',
      }}
    >
      <div className="flex flex-col pt-14 pb-0 text-context backdrop-blur-md">
        <span className="text-white text-center px-16">
          دریافت مشاوره رایگان
        </span>
        <span className="text-white text-center mt-2">توسط </span>
        <span className="text-white text-center mt-2">
          کارشناسان حرفه‌ای املاک
        </span>
        <button
          onClick={() => router.push('/request')}
          className="cursor-pointer mt-16 text-title
         bg-[#a17c45] px-8 py-3 text-white shadow-sm z-[1220000] transition-all duration-200 
         hover:brightness-110 rounded-b-sm"
        >
          ثبت درخواست
        </button>
      </div>
    </div>
  );
}
