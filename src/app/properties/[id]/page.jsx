'use client';

import Loading from '@/common/Loading';
import { useGetPropertyRequestById } from '@/hooks/usePropertyRequests';
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';
import { useParams } from 'next/navigation';
import CarouselComponent from '../Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function page() {
  const { id } = useParams();
  const { data, isLaoding } = useGetPropertyRequestById(id);
  const { propertyRequest } = data || {};
  if (isLaoding) return <Loading />;
  return (
    <div className="min-h-screen flex justify-center py-8 px-4 lg:py-18 md:px-22 bg-gray-100">
      <div className="grid gap-2 lg:grid-cols-2 min-h-full w-full justify-items-center">
        <div className="lg:col-span-1 grid py-2 lg:py-10 lg:px-3 w-full max-w-[600px]">
          <div className="rounded-lg bg-white shadow-lg p-2 md:px-3 max-h-[500px]">
            <h2 className="border-b border-gray-200 text-sm lg:text-[18px] py-3 ">
              مشخصات ملک
            </h2>
            <ul className="grid grid-cols-2 gap-y-10 py-3">
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  نوع آگهی :
                </span>
                <span className="text-propertyInfo  mr-1 lg:mr-2">
                  {propertyRequest?.type.title}
                </span>
              </li>
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  نوع ملک :
                </span>
                <span className="text-propertyInfo  mr-1 lg:mr-2">
                  {propertyRequest?.category.title}
                </span>
              </li>
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  منطقه :
                </span>
                <span className="text-propertyInfo  mr-1 lg:mr-2">
                  {propertyRequest?.location.title}
                </span>
              </li>
              {/* <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  منطقه/محله :
                </span>
                <span className="text-propertyInfo  mr-1 lg:mr-2">
                  {propertyRequest?.region}
                </span>
              </li> */}
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  متراژ :
                </span>
                {propertyRequest && (
                  <span className="text-propertyInfo  mr-1 lg:mr-2">
                    {toPersianNumbers(propertyRequest?.meter)}
                  </span>
                )}
              </li>
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  قیمت :
                </span>
                {propertyRequest && (
                  <>
                    <span className="text-propertyInfo  mr-1 lg:mr-2">
                      {toPersianNumbersWithComma(propertyRequest?.budget)}
                    </span>
                    <span className="text-propertyInfoTitle "> {'تومان'}</span>
                  </>
                )}
              </li>
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  سن بنا :
                </span>
                {propertyRequest && (
                  <span className="text-propertyInfo  mr-1 lg:mr-2">
                    {toPersianNumbers(propertyRequest?.propertyAge)} {'سال'}
                  </span>
                )}
              </li>
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  تعداد خواب :
                </span>
                {propertyRequest && (
                  <span className="text-propertyInfo  mr-1 lg:mr-2">
                    {toPersianNumbers(2)}
                  </span>
                )}
              </li>
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  تعداد واحد :
                </span>
                {propertyRequest && (
                  <span className="text-propertyInfo  mr-1 lg:mr-2">
                    {toPersianNumbers(propertyRequest.units)}
                  </span>
                )}
              </li>
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  طبقه :
                </span>
                {propertyRequest && (
                  <span className="text-propertyInfo  mr-1 lg:mr-2">
                    {toPersianNumbers(propertyRequest?.floor)}
                  </span>
                )}
              </li>
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  تعداد طبقات :
                </span>
                {propertyRequest && (
                  <span className="text-propertyInfo  mr-1 lg:mr-2">
                    {toPersianNumbers(propertyRequest?.floors)}
                  </span>
                )}
              </li>
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  پارکینگ :
                </span>
                <span className="text-propertyInfo  mr-1 lg:mr-2">
                  {propertyRequest?.parking ? 'دارد' : 'ندارد'}
                </span>
              </li>
              <li className="col-span-1">
                <span className="text-propertyInfoTitle font-thin  text-gray-400">
                  انباری :
                </span>
                <span className="text-propertyInfo  mr-1 lg:mr-2">
                  {propertyRequest?.warehouse ? 'دارد' : 'ندارد'}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:col-span-1 py-2 lg:py-10 lg:px-3 max-w-[600px]">
          <CarouselComponent requestImages={propertyRequest?.images} />
        </div>
      </div>
    </div>
  );
}

export default page;
