import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from '@/utils/toPersianNumbers';

export const requestLabel = [
  { id: 1001, label: 'نام و نام خانوادگی', englishLable: 'fullName' },
  { id: 1002, label: 'شماره تماس', englishLable: 'phoneNumber' },
  {
    id: 1003,
    label: 'نوع درخواست دهنده',
    englishLable: 'applicantType',
    hasSelect: true,
    isTruthy: false,
  },
  {
    id: 1004,
    label: 'کاربری',
    englishLable: 'category',
    hasSelect: true,
    isTruthy: false,
  },
  {
    id: 1005,
    label: 'خرید/فروش',
    englishLable: 'type',
    hasSelect: true,
    isTruthy: false,
  },
  {
    id: 1006,
    label: 'منطقه',
    englishLable: 'location',
    hasSelect: true,
    isTruthy: false,
  },
  { id: 1007, label: 'بودجه/قیمت (تومان)', englishLable: 'budget' },
  { id: 1008, label: 'تعداد طبقات', englishLable: 'floors' },
  { id: 1009, label: 'طبقه', englishLable: 'floor' },
  { id: 1010, label: 'سن بنا', englishLable: 'propertyAge' },
  { id: 2001, label: 'متراژ', englishLable: 'meter' },
  { id: 2002, label: 'تعداد واحد', englishLable: 'units' },
  { id: 2003, label: 'تعداد اتاق', englishLable: 'rooms' },
  {
    id: 2004,
    label: 'پارکینگ',
    englishLable: 'parking',
    hasSelect: true,
    isTruthy: true,
  },
  {
    id: 2005,
    label: 'انباری',
    englishLable: 'warehouse',
    hasSelect: true,
    isTruthy: true,
  },
  {
    id: 2006,
    label: 'آسانسور',
    englishLable: 'elevator',
    hasSelect: true,
    isTruthy: true,
  },
  {
    id: 2007,
    label: 'اولویت',
    englishLable: 'priority',
    hasSelect: true,
    isTruthy: false,
  },
  { id: 2008, label: 'تاریخ', englishLable: 'createdAt' },
  { id: 2009, label: 'آدرس', englishLable: 'address', hasTextArea: true },
  {
    id: 3001,
    label: 'توضیحات',
    englishLable: 'description',
    hasTextArea: true,
  },
];

export const existenceOptions = [
  { id: 1, value: true, title: 'دارد' },
  { id: 2, value: false, title: 'ندارد' },
];

export const priorities = [
  { _id: 1, value: 1, title: toPersianNumbers(1) },
  { _id: 2, value: 2, title: toPersianNumbers(2) },
  { _id: 3, value: 3, title: toPersianNumbers(3) },
  { _id: 4, value: 4, title: toPersianNumbers(4) + '(عمومی)' },
  { _id: 5, value: 5, title: toPersianNumbers(5) + '(بایگانی)' },
];

export const requestInit = {
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
  floor: 0,
  units: 0,
  description: '',
  address: '',
  parking: null,
  warehouse: null,
  elevator: null,
  images: {},
};

export default function requestInfo(propertyRequest, pageType) {
  let keys = [];
  if (propertyRequest) {
    for (const label of requestLabel) {
      for (const request in propertyRequest) {
        if (request === label.englishLable) {
          const obj = {
            id: label.id,
            name: request,
            value: propertyRequest[request],
            label: label.label + ' :',
            hasSelect: label.hasSelect,
            hasTextArea: label.hasTextArea,
            isTruthy: label.isTruthy,
            defaultValue: propertyRequest[request],
          };
          keys.push(obj);
        }
      }
    }
  }
  const readyKeys = keys.map((item) => {
    if (typeof item.defaultValue === 'object')
      return {
        ...item,
        defaultValue: item?.defaultValue?._id,
        value: pageType === 'edit' ? item?.value : item?.value?.title,
      };
    if (
      typeof item.value === 'string' &&
      item.name !== 'phoneNumber' &&
      item.name !== 'createdAt'
    )
      return { ...item };
    if (typeof item.value === 'boolean')
      return { ...item, value: item.value === true ? 'دارد' : 'ندارد' };
    if (typeof item.value === 'number' || item['name'] === 'phoneNumber')
      return {
        ...item,
        value:
          pageType === 'edit' || pageType === 'add'
            ? item.value
            : item.name === 'budget'
            ? toPersianNumbersWithComma(item.value)
            : toPersianNumbers(item.value),
      };
    if (item['name'] === 'createdAt')
      return {
        ...item,
        value: new Date(item.value).toLocaleDateString('fa-IR'),
      };
  });
  return readyKeys;
}
