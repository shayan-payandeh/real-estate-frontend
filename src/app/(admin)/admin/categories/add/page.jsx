'use client';

import Loading from '@/common/Loading';
import TextField from '@/common/TextField';
import { useAddCategory } from '@/hooks/useCategories';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

function page() {
  const [category, setCategory] = useState({
    title: '',
    englishTitle: '',
  });
  const router = useRouter();
  const { isLoading, mutateAsync } = useAddCategory();

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({ ...category });
      toast.success(message);
      router.push('/admin/categories');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <h1 className="mb-6 font-bold text-xl">افزودن کاربری جدید</h1>
      <div className="max-w-sm mb-10">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="عنوان"
            value={category.title || ''}
            onChange={handleChange}
          />
          <TextField
            name="englishTitle"
            label="عنوان انگلیسی"
            value={category.englishTitle || ''}
            onChange={handleChange}
          />

          <div className="mt-2">
            {isLoading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="btn btn--primary w-full sm:w-40 mt-3"
              >
                ثبت
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
