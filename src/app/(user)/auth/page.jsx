'use client';
import TextFieldMain from '@/common/TextFieldMain';
import { login } from '@/services/authService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

function page() {
  const [data, setData] = useState({ email: '', password: '' });
  const token = getCookie('accessToken');
  const router = useRouter();
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const searchParams = useSearchParams();
  const query = searchParams.get('page');

  useEffect(() => {
    if (token) router.push('/');
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await login(data);
      toast.success(message);
      if (query && query.includes('admin')) router.push(query);
      else router.push('/');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <main className="p-4 flex justify-center items-center  h-[90vh]">
      <form
        onSubmit={submitHandler}
        className="p-12 flex-col gap-2  "
        style={{
          boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        <h2 className="text-center border-b border-gray-400 py-2">
          ورود به سایت
        </h2>
        <br />
        <TextFieldMain
          label="ایمیل"
          name="email"
          value={data.email || ''}
          onChange={changeHandler}
        />
        <div className="mt-5">
          <TextFieldMain
            label="رمزعبور"
            name="password"
            value={data.password || ''}
            onChange={changeHandler}
          />
        </div>
        <button
          className="btn_main btn--primary_main  px-6 py-2 text-sm mt-10 w-full"
          type="submit"
        >
          ورود
        </button>
        <Link href={'/'}>
          <span className="mt-6 text-[.8rem] text-primary-300 text-center flex justify-center">
            بازگشت
          </span>
        </Link>
      </form>
    </main>
  );
}

export default page;
