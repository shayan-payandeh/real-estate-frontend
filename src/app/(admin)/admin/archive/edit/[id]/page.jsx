'use client';
import Loading from '@/common/Loading';
import Select from '@/common/Select';
import TextField from '@/common/TextField';
import { useGetApplicantTypes } from '@/hooks/useApplicantType';
import { useGetCategories } from '@/hooks/useCategories';
import { useGetLocations } from '@/hooks/useLocations';
import {
  useGetPropertyRequestById,
  useUpdatePropertyRequest,
} from '@/hooks/usePropertyRequests';
import { useGetPropertyTypes } from '@/hooks/usePropertyTypes';
import { toPersianNumbers } from '@/utils/toPersianNumbers';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function page() {
  const priorities = [
    { _id: 1, value: 1, title: toPersianNumbers(1) },
    { _id: 2, value: 2, title: toPersianNumbers(2) },
    { _id: 3, value: 3, title: toPersianNumbers(3) },
    { _id: 4, value: 4, title: toPersianNumbers(4) + '(عمومی)' },
    { _id: 5, value: 5, title: toPersianNumbers(5) + '(بایگانی)' },
  ];
  const { id } = useParams();
  const { data, isLoading } = useGetPropertyRequestById(id);
  const { propertyRequest: request } = data || {};
  const [newestPropertyRequest, setNewPropertyRequest] = useState({
    fullName: '',
    phoneNumber: '',
    type: '',
    category: '',
    location: '',
    applicantType: '',
    propertyAge: 0,
    meter: 0,
    budget: 0,
    rooms: 0,
    floors: 0,
    units: 0,
    description: '',
    priority: 0,
  });

  useEffect(() => {
    if (request && request._id === id)
      setNewPropertyRequest({
        fullName: request.fullName,
        applicantType: request.applicantType,
        phoneNumber: request.phoneNumber,
        type: request.type,
        category: request.category,
        propertyAge: request.propertyAge,
        meter: request.meter,
        floors: request.floors,
        rooms: request.rooms,
        units: request.units,
        location: request.location,
        budget: request.budget,
        description: request.description,
        priority: request.priority,
      });
  }, [request]);

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

  const handleChange = (e) => {
    const value =
      e.target.name === 'priority' ? parseInt(e.target.value) : e.target.value;

    setNewPropertyRequest({
      ...newestPropertyRequest,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync({
        data: { ...newestPropertyRequest },
        id: id,
      });
      toast.success('درخواست با موفقیت ویرایش شد');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  if (isLoading || categoriesIsLoading || propertyTypesIsLoading)
    return <Loading />;
  return (
    <div className="px-5">
      <h1 className="mb-6 font-bold text-lg">بروز رسانی درخواست </h1>
      <div className="max-w-[640px] mt-10 mb-10">
        <form
          className="space-y-5 flex-col justify-center "
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 sm:flex">
            <TextField
              name="fullName"
              label="نام و نام خانوادگی"
              value={newestPropertyRequest.fullName || ''}
              onChange={handleChange}
            />
            <TextField
              name="phoneNumber"
              label="شماره تماس"
              value={newestPropertyRequest.phoneNumber || ''}
              onChange={handleChange}
            />

            <div className="flex flex-col w-[200px]">
              <label className="mb-2 text-sm">{'نوع درخواست دهنده'}</label>
              {!applicantTypesIsLoading &&
                newestPropertyRequest.applicantType !== '' && (
                  <Select
                    defaultValue={newestPropertyRequest?.applicantType._id}
                    label="نوع درخواست دهنده"
                    name="applicantType"
                    options={applicantTypes}
                    onChange={handleChange}
                  />
                )}
            </div>
          </div>

          <div className="grid gap-5 sm:flex ">
            <div className="flex flex-col w-[200px]">
              <label className="mb-2 text-sm">{'خرید/فروش'}</label>
              {!propertyTypesIsLoading && newestPropertyRequest.type !== '' && (
                <Select
                  defaultValue={newestPropertyRequest?.type._id}
                  name="type"
                  options={propertyTypes}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className="flex flex-col w-[200px]">
              <label className="mb-2 text-sm">{'کاربری'}</label>
              {!categoriesIsLoading &&
                newestPropertyRequest.category !== '' && (
                  <Select
                    defaultValue={newestPropertyRequest?.category._id}
                    name="category"
                    options={categories}
                    onChange={handleChange}
                  />
                )}
            </div>
            <div className="flex flex-col w-[200px]">
              <label className="mb-2 text-sm">{'منطقه'}</label>
              {!locationsIsLoading && newestPropertyRequest.location !== '' && (
                <Select
                  defaultValue={newestPropertyRequest?.location._id}
                  label="منطقه"
                  name="location"
                  options={locations}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:flex">
            <TextField
              name="budget"
              label="بودجه/قیمت"
              value={newestPropertyRequest.budget || ''}
              onChange={handleChange}
            />
            <TextField
              name="meter"
              label="متراژ"
              value={newestPropertyRequest.meter || ''}
              onChange={handleChange}
            />
            <TextField
              name="propertyAge"
              label="حداکثر سن بنا"
              value={newestPropertyRequest.propertyAge || ''}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-5 sm:flex">
            <TextField
              name="rooms"
              label="تعداد اتاق"
              value={newestPropertyRequest.rooms || ''}
              onChange={handleChange}
            />
            <TextField
              name="floors"
              label="تعداد طبقات"
              value={newestPropertyRequest.floors || ''}
              onChange={handleChange}
            />
            <TextField
              name="units"
              label="تعداد واحد"
              value={newestPropertyRequest.units || ''}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-5 sm:flex">
            {newestPropertyRequest.priority !== 0 && (
              <div className="flex flex-col w-[200px]">
                <label htmlFor="priority" className="text-sm">
                  اولویت
                </label>
                <Select
                  defaultValue={newestPropertyRequest.priority}
                  name={'priority'}
                  onChange={handleChange}
                  options={priorities}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 lg:block">
            <label htmlFor="description" className="col-span-4">
              توضیحات
            </label>
            <div className="col-span-4">
              <textarea
                name="description"
                className="textArea__input  h-[19rem] sm:h-[14.5rem] lg:h-[14rem] xl:h-[12.5rem]"
                rows={3}
                cols={45}
                value={newestPropertyRequest.description || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-1">
            <button className="btn btn--primary w-full sm:w-40 mt-3">
              ثبت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
