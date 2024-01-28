import { useSearchParams } from 'next/navigation';

function FilterSectionMain({
  onChange,
  searchParams,
  type,
  categories,
  categoryQueryHandler,
  selectedCategories,
  priceHandler,
  selectedPrice,
}) {
  const typeArray = [
    { id: 10, title: 'همه', value: '', id: 'all' },
    { id: 20, title: 'خرید', value: 'buy', id: 'buy' },
    { id: 20, title: 'فروش', value: 'sell', id: 'sell' },
  ];

  const priceArray = [
    {
      id: 10,
      title: 'کمتر از 3 میلیارد ',
      value: 'priceMin=0,priceMax=3000000000',
    },
    {
      id: 20,
      title: 'بین 3 تا 5 میلیارد',
      value: 'priceMin=3000000000,priceMax=5000000000',
    },
    {
      id: 30,
      title: 'بین 5 تا 10 میلیارد',
      value: 'priceMin=5000000000,priceMax=10000000000',
    },
    {
      id: 40,
      title: 'بیش از 10 میلیارد',
      value: 'priceMin=10000000000',
    },
  ];
  return (
    <div>
      <div>
        <h3 className="text-sm mb-2">خرید/فروش :</h3>
        {typeArray.map((item) => (
          <div key={item.id} className="flex items-center mb-1">
            <input
              className=" text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => onChange(e)}
              type="radio"
              id={item.id}
              name="type"
              value={item.value}
              checked={type === item.value}
            />
            <label className="mr-1 text-[13px] text-gray-500" htmlFor={item.id}>
              {item.title}
            </label>
          </div>
        ))}
      </div>
      <br />
      <div>
        <h3 className="text-sm mb-2">کاربری :</h3>
        {categories?.categories?.map((category) => (
          <div key={category._id} className="flex items-center mb-1">
            <input
              type="checkbox"
              value={category.englishTitle}
              id={category.englishTitle}
              name="category"
              onChange={categoryQueryHandler}
              checked={selectedCategories?.includes(category.englishTitle)}
            />
            <label
              className="mr-1 text-[13px] text-gray-500"
              htmlFor={category.englishTitle}
            >
              {category.title}
            </label>
          </div>
        ))}
      </div>
      <br />
      <div>
        <h3 className="text-sm mb-2">قیمت :</h3>
        {priceArray.map((item) => (
          <div key={item.id} className="flex items-center mb-1">
            <input
              type="radio"
              value={item.value}
              id={item.value}
              name="price"
              onChange={priceHandler}
              checked={selectedPrice === item.value}
            />
            <label
              className="mr-1 text-[13px] text-gray-500"
              htmlFor={item.value}
            >
              {item.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterSectionMain;
