'use client';
import Loading from '@/common/Loading';
import FilterSectionMain from '@/component/FilterSectionMain';
import { useGetCategories } from '@/hooks/useCategories';
import { useGetPropertyRequests } from '@/hooks/usePropertyRequests';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { useState } from 'react';
import { CgSortAz } from 'react-icons/cg';

const sortValues = [
  { id: 101, value: 'latest', title: 'جدیدترین' },
  { id: 102, value: 'earliest', title: 'قدیمی ترین' },
  { id: 103, value: 'cheapest', title: 'ارزانترین' },
  { id: 104, value: 'expensive', title: 'گران ترین' },
  { id: 105, value: 'largest', title: 'بیشترین متراژ' },
  { id: 106, value: 'smallest', title: 'کمترین متراژ' },
];

function page() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    new URLSearchParams(searchParams).toString() + '&priority=4'
  );
  const { data, isLoading } = useGetPropertyRequests(query);
  const { propertyRequests } = data || {};
  const { data: categoriesData, isLoading: categoriesIsLoading } =
    useGetCategories();
  const [selectedType, setSelectedType] = useState(
    new URLSearchParams(searchParams).get('type') || ''
  );
  const [selectedCategories, setSelectedCategories] = useState(
    new URLSearchParams(searchParams).get('category')?.split(',') || []
  );
  const [selectedPrice, setSelectedPrice] = useState(() => {
    const priceMin = new URLSearchParams(searchParams).get('priceMin');
    const priceMax = new URLSearchParams(searchParams).get('priceMax');
    const value = priceMin
      ? priceMax
        ? `priceMin=${priceMin},priceMax=${priceMax}`
        : `priceMin=${priceMin}`
      : '';
    return value;
  });
  const [sortValue, setSortValue] = useState(
    new URLSearchParams(searchParams).get('sort') || 'latest'
  );
  const queryHandler = (e) => {
    setSelectedType(e.target.value);
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
    setQuery(newUrlParams.toString() + '&priority=4');
  };

  const categoryQueryHandler = (e) => {
    const newUrlParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, e.target.value]);
      selectedCategories
        ? newUrlParams.set(
            `${e.target.name}`,
            [...selectedCategories, e.target.value].toString()
          )
        : newUrlParams.set(`${e.target.name}`, `${e.target.value}`);
    } else {
      const filteredCategories = selectedCategories.filter(
        (category) => category !== e.target.value
      );
      setSelectedCategories(filteredCategories);
      if (selectedCategories.length > 1) {
        newUrlParams.delete(`${e.target.name}`);
        newUrlParams.set(`${e.target.name}`, filteredCategories.join());
      } else newUrlParams.delete(`${e.target.name}`);
    }
    if (isNaN(parseInt(e.target.value)) && newUrlParams.get('page')) {
      newUrlParams.delete('page');
    }
    router.push(`${pathname}?${newUrlParams.toString()}`);
    setQuery(newUrlParams.toString() + '&priority=4');
  };

  const priceHandler = (e) => {
    setSelectedPrice(e.target.value);
    const priceMin = e.target.value.includes('priceMax')
      ? e.target.value.substring(9, e.target.value.indexOf(','))
      : e.target.value.substring(9, e.target.value.length);

    const priceMax = e.target.value.includes('priceMax')
      ? e.target.value.split('priceMax=')[1]
      : null;

    const newUrlParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    if (newUrlParams.get('priceMin')) newUrlParams.delete('priceMin');
    if (newUrlParams.get('priceMax')) newUrlParams.delete('priceMax');
    newUrlParams.set('priceMin', priceMin);
    if (priceMax) newUrlParams.set('priceMax', priceMax);
    if (isNaN(parseInt(e.target.value)) && newUrlParams.get('page')) {
      newUrlParams.delete('page');
    }
    router.push(`${pathname}?${newUrlParams.toString()}`);
    setQuery(newUrlParams.toString() + '&priority=4');
  };

  const sortHandler = (value) => {
    setSortValue(value);
    const newUrlParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    if (newUrlParams.get('sort')) newUrlParams.delete('sort');
    newUrlParams.set('sort', value);
    router.push(`${pathname}?${newUrlParams.toString()}`);
    setQuery(newUrlParams.toString() + '&priority=4');
  };

  if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen flex justify-center px-4  bg-gray-100 ">
      <div className="w-full max-w-[1530px] grid grid-cols-5 xl:grid-cols-6 min-h-screen py-4 px-2 mb-10 mt-6">
        <div className="hidden bg-white lg:flex col-span-1 xl:col-span-1 border border-gray-200 px-3 py-4">
          <FilterSectionMain
            onChange={queryHandler}
            type={selectedType}
            categories={categoriesData}
            categoryQueryHandler={categoryQueryHandler}
            searchParams={searchParams}
            selectedCategories={selectedCategories}
            priceHandler={priceHandler}
            selectedPrice={selectedPrice}
          />
        </div>
        <div className="col-span-5 lg:col-span-4 xl:col-span-5 flex flex-col gap-8">
          <div className="w-full px-4">
            <div className="m-auto flex flex-col md:flex-row bg-white border-2 border-gray-200 rounded-md py-2 px-2 text-[12px] text-gray-500 max-w-[340px] sm:max-w-none">
              <div className="flex">
                <span>
                  <CgSortAz size={30} />
                </span>
                <span className="ml-5 p-2"> ترتیب نمایش :</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sortValues.map((item) => (
                  <span
                    className={`col-span-2 sm:col-span-1 text-center ml-0 p-2 cursor-pointer text-sortTitle ${
                      sortValue === item.value
                        ? 'bg-blue-50 text-blue-500 rounded-sm'
                        : ''
                    }`}
                    key={item.id}
                    onClick={() => sortHandler(item.value)}
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 px-4 gap-x-2 gap-y-6 justify-items-center">
            {propertyRequests?.docs?.map((request) => (
              <div
                key={request._id}
                className="bg-white shadow-lg grid max-h-72  w-full max-w-[340px]"
              >
                <Link href={`properties/${request._id}`}>
                  <div className="relative h-[170px] ">
                    <img
                      src={`${request?.images[0]?.src}`}
                      className="absolute w-full h-full"
                    />
                  </div>
                  <div className="grid">
                    <div className="space-y-1 px-3 py-2  border-t border-gray-300">
                      <p className="text-gray-500 text-[12px]">
                        {/* {request.location.title} */}
                        {request.region}
                      </p>
                      <h2>
                        {request.type.title}
                        &nbsp;
                        {request.category.title}
                        &nbsp;
                        {toPersianNumbers(request.meter)}
                        {' متری'}
                      </h2>
                      <p>
                        <span className="text-gray-500 text-[12px]">
                          {' قیمت : '}
                        </span>
                        {toPersianNumbersWithComma(request.budget)}
                        <span className="text-gray-500 text-[12px]">
                          {' تومان '}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-around  px-3 py-2  border-t border-gray-300">
                      <div className="text-center text-[12px] flex items-center justify-center">
                        سن بنا : {toPersianNumbers(request.propertyAge)} سال
                      </div>
                      <div className="text-center text-[12px] flex items-center justify-center">
                        متراژ : {toPersianNumbers(request.meter)}
                      </div>
                      {request.category.englishTitle === 'apartment' && (
                        <div className="text-center text-[12px] flex items-center justify-center">
                          خواب : {toPersianNumbers(request.rooms)}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="px-2 mt-5 flex justify-center sm:justify-start">
            <Pagination
              showTitle={false}
              pageSize={propertyRequests?.limit}
              current={propertyRequests?.page}
              total={propertyRequests?.totalDocs}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
