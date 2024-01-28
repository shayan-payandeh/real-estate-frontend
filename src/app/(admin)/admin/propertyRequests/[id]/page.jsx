'use client';
import CarouselComponent from '@/app/properties/Carousel';
import Loading from '@/common/Loading';
import TextArea from '@/common/TextArea';
import TextFieldView from '@/common/TextFieldView';
import requestInfo from '@/constant/requestLabel';
import {
  useGetPropertyRequestById,
  useUpdatePropertyRequest,
} from '@/hooks/usePropertyRequests';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function page() {
  const { id } = useParams();
  const { data, isLoading } = useGetPropertyRequestById(id);
  const { propertyRequest } = data || {};
  const { isLoading: updatePropertyRequestIsLoading, mutateAsync } =
    useUpdatePropertyRequest();
  const queryClient = useQueryClient();
  const router = useRouter();

  const readyKeys = requestInfo(propertyRequest);
  useEffect(() => {
    mutateAsync({
      data: {
        isChecked: true,
      },
      id: id,
    });
    queryClient.invalidateQueries({ queryKey: ['get-propertyRequests'] });
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="grid grid-cols-3 gap-y-10 border-2 border-slate-100 shadow-xl p-5">
        {readyKeys
          .filter(
            (item) => item.name !== 'address' && item.name !== 'description'
          )
          .map((item) => (
            <div
              key={item.id}
              className="px-3 py-2 col-span-3 sm:col-span-1 grid grid-cols-4 lg:block"
            >
              <TextFieldView item={item} />
            </div>
          ))}

        <div className="px-1 py-2 col-span-3  grid grid-cols-4">
          <div className="col-span-4 lg:col-span-2">
            {readyKeys
              .filter(
                (item) => item.name === 'address' || item.name === 'description'
              )
              .map((item) => (
                <div key={item.id} className="col-span-4">
                  <TextArea item={item} />
                </div>
              ))}
          </div>
          <div className="col-span-4 lg:col-span-2 max-w-[430px] lg:max-w-lg py-2 lg:py-8 lg:px-3">
            <CarouselComponent requestImages={propertyRequest?.images} />
          </div>
        </div>

        <div className="col-span-3 flex flex-col sm:flex-row">
          <div className="px-3 py-2 w-full flex justify-center sm:justify-start">
            <button
              className="px-4 border border-slate-800 text-slate-800 py-2 rounded-md shadow-md hover:bg-slate-100 transition-all duration-300 w-full sm:w-auto"
              onClick={() => router.push('/admin/propertyRequests')}
            >
              بازگشت
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
