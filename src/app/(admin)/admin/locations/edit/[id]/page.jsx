'use client';
import Loading from '@/common/Loading';
import TextField from '@/common/TextField';
import { useGetLocationById, useUpdateLocation } from '@/hooks/useLocations';
import { includeObj } from '@/utils/objectUtils';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const includesLocationKey = ['title', 'englishTitle'];

function page() {
  const { id } = useParams();
  const { data, isLoading: isLoadingLocation } = useGetLocationById(id);
  const { location } = data || {};
  const [formData, setFormData] = useState({});
  const { isLoading, mutateAsync } = useUpdateLocation();
  const router = useRouter();

  useEffect(() => {
    if (location) setFormData(includeObj(location, includesLocationKey));
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        data: { ...formData },
        id: location._id,
      });
      toast.success(message);
      router.push('/admin/locations');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoadingLocation) return <Loading />;
  return (
    <div>
      <h1 className="mb-6 font-bold text-xl">ویرایش منطقه </h1>
      <div className="max-w-sm mb-10">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="عنوان"
            value={formData.title || ''}
            onChange={handleChange}
          />
          <TextField
            name="englishTitle"
            label="عنوان انگلیسی"
            value={formData.englishTitle || ''}
            onChange={handleChange}
          />

          <div className="mt-2">
            {isLoading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="btn btn--primary w-full sm:w-40 mt-3"
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
