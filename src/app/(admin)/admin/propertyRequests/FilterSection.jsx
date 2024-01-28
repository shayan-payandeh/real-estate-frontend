import { toPersianNumbers } from '@/utils/toPersianNumbers';
import { FaFilter, FaSort } from 'react-icons/fa';

function FilterSection({
  searchParams,
  queryHandler,
  locations,
  categories,
  propertyTypes,
  archive = false,
}) {
  return (
    <>
      <div className={`flex flex-col xl:flex-row gap-8  py-5 p-2`}>
        <div className="overflow-hidden">
          <div className="flex font-bold text-[13px]">
            <FaFilter color="rgb(100 116 139)" size={11} />
            <span className="mr-1"> فیلتر بر اساس:</span>
          </div>
          <div className="grid grid-cols-5 py-4 px-0 gap-2">
            <div className="xl:mr-10 col-span-5 sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="location"
                className="text-sm text-slate-600 inline-block min-w-[2.7rem]"
              >
                منطقه
              </label>
              <select
                value={new URLSearchParams(searchParams).get('location') || ''}
                style={{
                  color: 'rgb(100 116 139)',
                }}
                name="location"
                onChange={queryHandler}
                className="w-24 border-b border-r shadow-md border-slate-400 rounded-sm px-2 text-sm mr-3 text-slate-500"
              >
                <option value="">همه</option>
                {locations?.map((location) => (
                  <option key={location._id} value={location.englishTitle}>
                    {location.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="xl:mr-10 col-span-5 sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="category"
                className="text-sm text-slate-600 inline-block min-w-[2.7rem]"
              >
                کاربری
              </label>
              <select
                value={new URLSearchParams(searchParams).get('category') || ''}
                style={{
                  color: 'rgb(100 116 139)',
                }}
                name="category"
                onChange={queryHandler}
                className="w-24 border-b border-r shadow-md border-slate-400 rounded-sm px-2 text-sm mr-3 text-slate-500"
              >
                <option value="">همه</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category.englishTitle}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="xl:mr-10 col-span-5 sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="type"
                className="text-sm text-slate-600 inline-block min-w-[2.7rem]"
              >
                خدمت
              </label>
              <select
                value={new URLSearchParams(searchParams).get('type') || ''}
                style={{
                  color: 'rgb(100 116 139)',
                }}
                name="type"
                onChange={queryHandler}
                className="w-24 border-b border-r shadow-md border-slate-400 rounded-sm px-2 text-sm mr-3 text-slate-500"
              >
                <option value="">همه</option>
                {propertyTypes?.map((type) => (
                  <option key={type._id} value={type.englishTitle}>
                    {type.title}
                  </option>
                ))}
              </select>
            </div>
            {!archive && (
              <div className="xl:mr-10 col-span-5 sm:col-span-2 lg:col-span-1">
                <label
                  htmlFor="priority"
                  className="text-sm text-slate-600 inline-block min-w-[2.7rem]"
                >
                  اولویت
                </label>
                <select
                  value={
                    new URLSearchParams(searchParams).get('priority') || ''
                  }
                  style={{
                    color: 'rgb(100 116 139)',
                  }}
                  name="priority"
                  onChange={queryHandler}
                  className="w-24 border-b border-r shadow-md border-slate-400 rounded-sm px-2 text-sm mr-3 text-slate-500"
                >
                  <option value="">همه</option>
                  <option value={1}>{toPersianNumbers(1)}</option>
                  <option value={2}>{toPersianNumbers(2)}</option>
                  <option value={3}>{toPersianNumbers(3)}</option>
                  <option value={4}>
                    {toPersianNumbers(4)} {'(عمومی)'}
                  </option>
                  {/* <option value={5}>
                  {toPersianNumbers(5)}
                  {'(بایگانی)'}
                </option> */}
                </select>
              </div>
            )}
            <div className="xl:mr-10 col-span-5 sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="isChecked"
                className="text-sm text-slate-600 inline-block min-w-[2.7rem]"
              >
                وضعیت
              </label>
              <select
                value={new URLSearchParams(searchParams).get('isChecked') || ''}
                style={{
                  color: 'rgb(100 116 139)',
                }}
                name="isChecked"
                onChange={queryHandler}
                className="w-24 border-b border-r shadow-md border-slate-400 rounded-sm px-2 text-sm mr-3 text-slate-500"
              >
                <option value="">همه</option>
                <option value={false}>جدید</option>
                <option value={true}>بررسی شده</option>
              </select>
            </div>
          </div>
        </div>
        <div className="xl:mr-5">
          <div className="flex font-bold text-[13px] mt-2">
            <FaSort color="rgb(100 116 139)" />
            <span className="mr-1"> مرتب سازی:</span>
          </div>
          <div className="py-3">
            <div>
              <select
                value={new URLSearchParams(searchParams).get('sort') || ''}
                style={{
                  color: 'rgb(100 116 139)',
                }}
                name="sort"
                onChange={queryHandler}
                className="border-b border-r shadow-md border-slate-400 rounded-sm px-2 text-sm mr-3 text-slate-500"
              >
                <option value={'latest'}>جدیدترین</option>
                <option value={'earliest'}>قدیمی ترین</option>
                <option value={'largest'}>بیشترین متراژ</option>
                <option value={'smallest'}>کمترین متراژ</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSection;
