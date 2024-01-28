'use client';
import Loading from '@/common/Loading';
import TextAreaAdd from '@/common/TextAreaAdd';
import TextFieldAdd from '@/common/TextFieldAdd';
import requestInfo, { requestInit } from '@/constant/requestLabel';
import { useGetApplicantTypes } from '@/hooks/useApplicantType';
import { useGetCategories } from '@/hooks/useCategories';
import { useGetLocations } from '@/hooks/useLocations';
import { useAddPropertyRequest } from '@/hooks/usePropertyRequests';
import { useGetPropertyTypes } from '@/hooks/usePropertyTypes';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

function page() {
  const [propertyRequest, setPropertyRequest] = useState(requestInit);
  const router = useRouter();
  const { isLoading, mutateAsync } = useAddPropertyRequest();

  const { data, isLoading: categoriesIsLoading } = useGetCategories();
  const { categories } = data || {};
  const { data: locationsData, isLoading: locationsIsLoading } =
    useGetLocations();
  const { locations } = locationsData || {};
  const { data: applicantTypeData, isLoading: applicantTypesIsLoading } =
    useGetApplicantTypes();
  const { applicantTypes } = applicantTypeData || {};
  const { data: propertyTypesData, isLoading: propertyTypesIsLoading } =
    useGetPropertyTypes();
  const { types: propertyTypes } = propertyTypesData || {};
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setPropertyRequest({ ...propertyRequest, [e.target.name]: e.target.value });
  };

  const handlePhotos = (e) => {
    setPropertyRequest({
      ...propertyRequest,
      images: e.target.files,
    });
  };

  const requestLabel = requestInfo(propertyRequest, 'add');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      for (let i = 0; i < propertyRequest.images.length; i++) {
        formData.append('images', propertyRequest.images[i]);
      }
      for (const item of requestLabel) {
        if (item.name !== 'images') {
          formData.append(item.name, item.value);
        }
      }

      const { message } = await mutateAsync(formData);
      toast.success(message);
      setPropertyRequest(requestInit);
      queryClient.invalidateQueries({
        queryKey: ['get-propertyRequests'],
      });
      router.push('/admin/propertyRequests');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  if (
    isLoading ||
    applicantTypesIsLoading ||
    locationsIsLoading ||
    categoriesIsLoading ||
    propertyTypesIsLoading
  )
    return <Loading />;
  return (
    <div className="px-5">
      <h1 className="mb-6 font-bold text-lg">افزودن درخواست جدید</h1>
      <div className="max-w-[640px] mb-10">
        <form
          className="grid grid-cols-6 gap-y-8 gap-x-3"
          onSubmit={handleSubmit}
        >
          {requestLabel.map((item) => (
            <div
              key={item.id}
              className={`col-span-6 ${
                !item.hasTextArea ? 'sm:col-span-3 md:col-span-2' : ''
              }`}
            >
              <TextFieldAdd
                handleChange={handleChange}
                item={item}
                obj={{
                  applicantType: applicantTypes,
                  type: propertyTypes,
                  category: categories,
                  location: locations,
                }}
              />
            </div>
          ))}

          <div className="col-span-5 w-full max-w-[150px]">
            <input type="file" multiple name="images" onChange={handlePhotos} />
          </div>
          <div className="col-span-6">
            {isLoading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="btn btn--primary w-full max-w-[200px] sm:w-40 mt-3"
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
