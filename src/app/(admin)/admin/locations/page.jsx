'use client';
import Loading from '@/common/Loading';
import Link from 'next/link';
import { HiPlusCircle } from 'react-icons/hi';
import { useGetLocations } from '@/hooks/useLocations';
import LocationListTable from './LocationListTable';

function page() {
  const { data, isLoading } = useGetLocations();
  const { locations } = data || {};
  if (isLoading) return <Loading />;

  const filteredLocation = locations?.filter(
    (item) => item.englishTitle !== 'other'
  );

  return (
    <>
      <div className="mb-5 flex flex-col sm:flex-row gap-5 item-center justify-between">
        <h1 className="text-xl font-bold mb-5">منطقه ها</h1>
        <Link
          href="/admin/locations/add"
          className="flex font-bold text-slate-700 items-center gap-x-2 "
        >
          <HiPlusCircle className="w-4 h-4" />
          <span className="text-sm">منطقه جدید</span>
        </Link>
      </div>
      <LocationListTable locations={filteredLocation} />
    </>
  );
}

export default page;
