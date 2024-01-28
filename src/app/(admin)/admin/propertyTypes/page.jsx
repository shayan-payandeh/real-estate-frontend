'use client';
import Loading from '@/common/Loading';
import { useGetPropertyTypes } from '@/hooks/usePropertyTypes';
import Link from 'next/link';
import { HiPlusCircle } from 'react-icons/hi';
import PropertyTypesListTable from './PropertyTypesListTable';

function page() {
  const { data, isLoading } = useGetPropertyTypes();
  const { types } = data || {};

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="mb-5 flex flex-col sm:flex-row gap-5 item-center justify-between">
        <h1 className="text-xl font-bold mb-5">انواع خدمات</h1>
        <Link
          href="/admin/propertyTypes/add"
          className="flex font-bold text-slate-700 items-center gap-x-2 "
        >
          <HiPlusCircle className="w-4 h-4" />
          <span className="text-sm">خدمت جدید</span>
        </Link>
      </div>
      <PropertyTypesListTable propertyTypes={types} />
    </>
  );
}

export default page;
