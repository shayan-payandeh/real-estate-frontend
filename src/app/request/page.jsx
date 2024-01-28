'use client';
import Loading from '@/common/Loading';
import TextFieldAdd from '@/common/TextFieldAdd';
import requestInfo, { requestInit } from '@/constant/requestLabel';
import { useGetApplicantTypes } from '@/hooks/useApplicantType';
import { useGetCategories } from '@/hooks/useCategories';
import { useGetLocations } from '@/hooks/useLocations';
import { useAddPropertyRequest } from '@/hooks/usePropertyRequests';
import { useGetPropertyTypes } from '@/hooks/usePropertyTypes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

function page() {
  const [nextStep, setNextStep] = useState(false);
  const [mainInfo, setMainInfo] = useState(
    Object.fromEntries(
      Object.entries(requestInit).filter(
        ([key, value]) => key === 'fullName' || key === 'phoneNumber'
      )
    )
  );

  const [propertyRequest, setPropertyRequest] = useState(
    Object.fromEntries(
      Object.entries(requestInit).filter(
        ([key, value]) => key !== 'fullName' && key !== 'phoneNumber'
      )
    )
  );
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

  const handleChange = (e) => {
    setPropertyRequest({ ...propertyRequest, [e.target.name]: e.target.value });
  };

  const requestLabel = requestInfo(propertyRequest, 'add');

  const handlePhotos = (e) => {
    setPropertyRequest({
      ...propertyRequest,
      images: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let i = 0; i < propertyRequest.images.length; i++) {
        formData.append('images', propertyRequest.images[i]);
      }
      formData.append('fullName', mainInfo.fullName);
      formData.append('phoneNumber', mainInfo.phoneNumber);

      for (const item of requestLabel) {
        if (
          item.name !== 'images' ||
          item.name !== 'fullName' ||
          item.name !== 'phoneNumber'
        ) {
          formData.append(item.name, item.value);
        }
      }
      const { message } = await mutateAsync(formData);
      toast.success(message);
      setPropertyRequest(requestInit);
      router.push('/');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const mainInfoHandle = (e) => {
    setMainInfo({ ...mainInfo, [e.target.name]: e.target.value });
  };
  const nextStepHandle = () => {
    setNextStep((prev) => !prev);
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
    <div className="p-6">
      <h1 className="mb-10 font-bold text-lg">ثبت درخواست </h1>
      {!nextStep && (
        <div className="max-w-[640px] mb-10">
          <form onSubmit={nextStepHandle}>
            <label
              htmlFor="fullName"
              className="block mb-2 text-title text-label"
            >
              نام و نام خانوادگی
            </label>
            <input
              required
              onInvalid={(e) =>
                e.target.setCustomValidity('نام کامل خود را وارد کنید')
              }
              onInput={(e) => e.target.setCustomValidity('')}
              autoComplete="off"
              className="textField__input_main"
              type="text"
              name="fullName"
              id={'fullName'}
              value={mainInfo.fullName}
              onChange={mainInfoHandle}
              title=""
            />

            <br />
            <br />
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-title text-label"
            >
              شماره تماس
            </label>
            <input
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(' شماره صحیح را وارد کنید')
              }
              onInput={(e) => e.target.setCustomValidity('')}
              autoComplete="off"
              pattern="[0-9]+"
              minLength={11}
              maxLength={11}
              className="textField__input_main"
              type="text"
              name="phoneNumber"
              id={'phoneNumber'}
              value={mainInfo.phoneNumber}
              onChange={mainInfoHandle}
              title=""
            />

            <br />
            <br />
            <button
              className="btn_main btn--primary_main w-[200px] mt-3"
              type="submit"
            >
              ادامه
            </button>
          </form>
        </div>
      )}
      {nextStep && (
        <div className="max-w-[640px] mb-10">
          <form
            encType="multipart/form-data"
            className="grid grid-cols-6 gap-y-8 gap-x-3"
            onSubmit={handleSubmit}
          >
            {requestLabel
              .filter(
                (item) =>
                  item.name !== 'fullName' && item.name !== 'phoneNumber'
              )
              .map((item) => (
                <div
                  key={item.id}
                  className={`col-span-6 ${
                    !item.hasTextArea ? 'sm:col-span-3 md:col-span-2' : ''
                  }`}
                >
                  <TextFieldAdd
                    requestPage={true}
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

            <div className="col-span-5 w-full max-w-[120px]">
              <input
                type="file"
                multiple
                name="images"
                onChange={handlePhotos}
              />
            </div>

            <div className="col-span-6 max-w-[430px] flex flex-col sm:flex-row  sm:justify-between sm:items-center gap-y-8">
              <button
                type="submit"
                className="btn_main btn--primary_main w-full max-w-[200px] sm:w-40"
              >
                ثبت
              </button>

              <button
                className="btn_main btn--secondary_main w-full  max-w-[200px] sm:w-40 "
                onClick={nextStepHandle}
              >
                بازگشت
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default page;
