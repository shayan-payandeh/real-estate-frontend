'use client';
import Loading from '@/common/Loading';
import TextAreaAdd from '@/common/TextAreaAdd';
import TextFieldAdd from '@/common/TextFieldAdd';
import requestInfo, { priorities, requestInit } from '@/constant/requestLabel';
import { useGetApplicantTypes } from '@/hooks/useApplicantType';
import { useGetCategories } from '@/hooks/useCategories';
import { useGetLocations } from '@/hooks/useLocations';
import {
  useGetPropertyRequestById,
  useUpdatePropertyRequest,
} from '@/hooks/usePropertyRequests';
import { useGetPropertyTypes } from '@/hooks/usePropertyTypes';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function page() {
  const { id } = useParams();
  const { data, isLoading } = useGetPropertyRequestById(id);
  const { propertyRequest } = data || {};
  const queryClient = useQueryClient();
  const [newPropertyRequest, setNewPropertyRequest] = useState(requestInit);

  const { isLoading: updatePropertyRequestIsLoading, mutateAsync } =
    useUpdatePropertyRequest();
  const router = useRouter();
  const { data: categoriesData, isLoading: categoriesIsLoading } =
    useGetCategories();
  const { categories } = categoriesData || {};
  const { data: locationsData, isLoading: locationsIsLoading } =
    useGetLocations();
  const { locations } = locationsData || {};
  const { data: applicantTypeData, isLoading: applicantTypesIsLoading } =
    useGetApplicantTypes();
  const { applicantTypes } = applicantTypeData || {};
  const { data: propertyTypesData, isLoading: propertyTypesIsLoading } =
    useGetPropertyTypes();
  const { types: propertyTypes } = propertyTypesData || {};

  useEffect(() => {
    if (propertyRequest && propertyRequest._id === id)
      setNewPropertyRequest({
        fullName: propertyRequest.fullName,
        applicantType: propertyRequest.applicantType,
        phoneNumber: propertyRequest.phoneNumber,
        type: propertyRequest.type,
        category: propertyRequest.category,
        propertyAge: propertyRequest.propertyAge,
        meter: propertyRequest.meter,
        floors: propertyRequest.floors,
        floor: propertyRequest.floor,
        rooms: propertyRequest.rooms,
        units: propertyRequest.units,
        location: propertyRequest.location,
        budget: propertyRequest.budget,
        description: propertyRequest.description,
        address: propertyRequest.address,
        parking: propertyRequest?.parking,
        warehouse: propertyRequest.warehouse,
        elevator: propertyRequest.elevator,
        priority: propertyRequest.priority,
      });
  }, [propertyRequest]);

  useEffect(() => {
    mutateAsync({
      data: {
        isChecked: true,
      },
      id: id,
    });
    queryClient.invalidateQueries({ queryKey: ['get-propertyRequests'] });
  }, []);

  const handleChange = (e) => {
    const value =
      e.target.name === 'priority' ? parseInt(e.target.value) : e.target.value;
    setNewPropertyRequest({
      ...newPropertyRequest,
      [e.target.name]: value,
    });
  };

  const requestLabel = requestInfo(
    {
      ...newPropertyRequest,
      _id: propertyRequest?._id,
    },
    'edit'
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync({
        data: { ...newPropertyRequest },
        id: id,
      });
      toast.success('درخواست با موفقیت ویرایش شد');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
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
      <h1 className="mb-6 font-bold text-lg">بروز رسانی درخواست </h1>
      <div className="max-w-[640px] mt-10 mb-10">
        {newPropertyRequest.applicantType && (
          <form
            className="grid grid-cols-6 gap-y-8 gap-x-3"
            onSubmit={handleSubmit}
          >
            {requestLabel
              .filter((item) => item.name !== 'createdAt')
              .map((item) => (
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
                      priority: priorities,
                    }}
                  />
                </div>
              ))}
            <div className="px-1">
              <button className="btn btn--primary w-full sm:w-40 mt-3">
                ثبت
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default page;
