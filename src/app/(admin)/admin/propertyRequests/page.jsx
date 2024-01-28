'use client';
import Loading from '@/common/Loading';
import Link from 'next/link';
import { HiPlusCircle } from 'react-icons/hi';
import PropertyRequestsListTable from './PropertyRequestListTable';
import { useGetPropertyRequests } from '@/hooks/usePropertyRequests';
import { useGetCategories } from '@/hooks/useCategories';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetPropertyTypes } from '@/hooks/usePropertyTypes';
import { useState } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { toPersianNumbers } from '@/utils/toPersianNumbers';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import { IoIosArrowDown } from 'react-icons/io';
import FilterSection from './FilterSection';
import { useGetLocations } from '@/hooks/useLocations';

function page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    new URLSearchParams(searchParams).toString()
  );
  const { data, isLoading } = useGetPropertyRequests(query);
  const { propertyRequests } = data || {};
  const { data: categoriesData, isLoading: categoriesIsLoading } =
    useGetCategories();
  const { categories } = categoriesData || {};
  const { data: locationsData, isLoading: locationsIsLoading } =
    useGetLocations();
  const { locations } = locationsData || {};

  const { data: propertyTypesData, isLoading: propertyTypesIsLoading } =
    useGetPropertyTypes();
  const { types: propertyTypes } = propertyTypesData || {};

  if (isLoading) return <Loading />;

  const queryHandler = (e) => {
    const newUrlParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    newUrlParams && e.target.value
      ? newUrlParams.set(`${e.target.name}`, `${e.target.value}`)
      : newUrlParams.delete(`${e.target.name}`);

    // remove page (in query) when we select filter section
    // we should assure that we dont remove page (in query) when we change the page number
    if (isNaN(parseInt(e.target.value)) && newUrlParams.get('page')) {
      newUrlParams.delete('page');
    }
    router.push(`${pathname}?${newUrlParams.toString()}`);
    setQuery(newUrlParams.toString());
  };

  const AccordionItem = ({ header, ...rest }) => (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          <IoIosArrowDown
            className={` transition-transform duration-200 ease-out ${
              isEnter && 'rotate-180'
            }`}
          />
        </>
      )}
      initialEntered={true}
      className="shadow-md border border-slate-100 bg-gray-100 hidden lg:block"
      contentProps={{
        className: 'transition-height duration-500 ease-out bg-white',
      }}
      panelProps={{ className: '' }}
      buttonProps={{ className: ({ isEnter }) => `py-3 px-2` }}
    />
  );

  const AccordionItemMobile = ({ header, ...rest }) => (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          <IoIosArrowDown
            className={` transition-transform duration-200 ease-out ${
              isEnter && 'rotate-180'
            }`}
          />
        </>
      )}
      className="shadow-md border border-slate-100 bg-gray-100  lg:hidden"
      contentProps={{
        className: 'transition-height duration-500 ease-out bg-white',
      }}
      panelProps={{ className: '' }}
      buttonProps={{ className: ({ isEnter }) => `py-3 px-2` }}
    />
  );

  return (
    <>
      <div className="mb-5 flex flex-col sm:flex-row gap-5 item-center justify-between">
        <h1 className="text-xl font-bold mb-3">درخواست ها</h1>
        <Link
          href="/admin/propertyRequests/add"
          className="flex font-bold text-slate-700 items-center gap-x-2 "
        >
          <HiPlusCircle className="w-4 h-4" />
          <span className="text-sm">درخواست جدید</span>
        </Link>
      </div>

      <Accordion transition>
        <AccordionItem>
          <FilterSection
            searchParams={searchParams}
            queryHandler={queryHandler}
            locations={locations}
            categories={categories}
            propertyTypes={propertyTypes}
          />
        </AccordionItem>
        <AccordionItemMobile>
          <FilterSection
            searchParams={searchParams}
            queryHandler={queryHandler}
            locations={locations}
            categories={categories}
            propertyTypes={propertyTypes}
          />
        </AccordionItemMobile>
      </Accordion>
      <PropertyRequestsListTable propertyRequests={propertyRequests} />
      <Pagination
        showTitle={false}
        pageSize={propertyRequests?.limit}
        current={propertyRequests?.page}
        total={propertyRequests.totalDocs}
        onChange={(e) => {
          const x = { target: { name: 'page', value: e.toString() } };
          queryHandler(x);
        }}
        itemRender={(page, type, element) => {
          if (type === 'page')
            return (
              <span className="font-number text-[13px] text-center">
                {toPersianNumbers(page)}
              </span>
            );
          return <span>{element}</span>;
        }}
      />
    </>
  );
}

export default page;
