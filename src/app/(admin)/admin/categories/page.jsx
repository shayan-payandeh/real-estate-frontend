'use client';
import Loading from '@/common/Loading';
import { useGetCategories } from '@/hooks/useCategories';
import Link from 'next/link';
import { HiPlusCircle } from 'react-icons/hi';
import CategoryListTable from './CategoryListTable';

function page() {
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="mb-5 flex flex-col sm:flex-row gap-5 item-center justify-between">
        <h1 className="text-xl font-bold mb-5">کاربری ها</h1>
        <Link
          href="/admin/categories/add"
          className="flex font-bold text-slate-700 items-center gap-x-2 "
        >
          <HiPlusCircle className="w-4 h-4" />
          <span className="text-sm">کاربری جدید</span>
        </Link>
      </div>
      <CategoryListTable categories={categories} />
    </>
  );
}

export default page;
