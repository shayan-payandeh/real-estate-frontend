'use client';
import { useGetPropertyRequests } from '@/hooks/usePropertyRequests';
import { useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Loading from '@/common/Loading';
import {
  CHART_COLORS,
  months,
  requestCategoryCountByMonth,
  requestCountByMonth,
  transparentize,
} from '@/utils/chartUtil';
import { toPersianNumbers } from '@/utils/toPersianNumbers';
Chart.register(CategoryScale);

function page() {
  const { isLoading, data } = useGetPropertyRequests('page=all');
  const { propertyRequests } = data || {};
  const { docs } = propertyRequests || {};
  const dataChart = docs?.map((item) => ({
    id: item._id,
    date: item.createdAt,
    persianDate: new Date(item.createdAt).toLocaleDateString('fa-IR'),
    type: item.type['title'],
    category: item.category['title'],
  }));
  const [year, setYear] = useState(
    new Date().toLocaleDateString('fa-IR').slice(0, 4)
  );
  const [yearSecond, setYearSecond] = useState(
    new Date().toLocaleDateString('fa-IR').slice(0, 4)
  );

  const yearHanlder = (e) => {
    setYear(e.target.value);
  };
  const yearHanlderSecond = (e) => {
    setYearSecond(e.target.value);
  };

  const allYears = dataChart?.map((item) => item.persianDate.slice(0, 4));
  const years = [...new Set(allYears)];

  const buyCountByMonth = requestCountByMonth(
    dataChart,
    toPersianNumbers(year),
    'خرید'
  );
  const sellCountByMonth = requestCountByMonth(
    dataChart,
    toPersianNumbers(year),
    'فروش'
  );
  ///
  const residentialCountByMonth = requestCategoryCountByMonth(
    dataChart,
    toPersianNumbers(yearSecond),
    'مسکونی'
  );
  const businessCountByMonth = requestCategoryCountByMonth(
    dataChart,
    toPersianNumbers(yearSecond),
    'تجاری'
  );
  const officeCountByMonth = requestCategoryCountByMonth(
    dataChart,
    toPersianNumbers(yearSecond),
    'اداری'
  );
  ///
  const labels = months({ count: 12 });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'خرید',
        data: buyCountByMonth,
        borderColor: CHART_COLORS.red,
        backgroundColor: transparentize(CHART_COLORS.red, 0.5),
      },
      {
        label: 'فروش',
        data: sellCountByMonth,
        borderColor: CHART_COLORS.blue,
        backgroundColor: transparentize(CHART_COLORS.blue, 0.4),
      },
    ],
  };

  const chartDataSecond = {
    labels: labels,
    datasets: [
      {
        label: 'مسکونی',
        data: residentialCountByMonth,
        borderColor: CHART_COLORS.red,
        backgroundColor: transparentize(CHART_COLORS.red, 0.5),
      },
      {
        label: 'تجاری',
        data: businessCountByMonth,
        borderColor: CHART_COLORS.blue,
        backgroundColor: transparentize(CHART_COLORS.blue, 0.4),
      },
      {
        label: 'اداری',
        data: officeCountByMonth,
        borderColor: CHART_COLORS.green,
        backgroundColor: transparentize(CHART_COLORS.green, 0.4),
      },
    ],
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="relative w-full flex items-center justify-center flex-col gap-5 py-5 overflow-auto">
        <div className="flex flex-col items-center justify-center  py-8 px-1 lg:w-[50%] m-auto font-sans bg-white">
          <select
            onChange={yearHanlder}
            className="px-2 border border-slate-300 shadow-md rounded-lg text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
            <option value={'1401'}>{toPersianNumbers(1401)}</option>
          </select>
          <h2 className="text-center mt-3">
            نمودار خرید و فروش سال {toPersianNumbers(year)}
          </h2>
          <Bar
            style={{
              padding: '10px',
            }}
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: '',
                },
                tooltip: {
                  titleFont: { family: 'Vazir' },
                  bodyFont: { family: 'Vazir' },
                  // boxPadding: 5,
                },

                legend: {
                  display: true,
                  labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                      family: 'Vazir',
                      size: 11,
                    },
                  },
                },
              },

              scales: {
                x: {
                  ticks: {
                    font: { family: 'Vazir', style: 'normal', size: 11 },
                    display: { allYears },
                  },
                },
                y: {
                  ticks: { font: 'Vazir' },

                  suggestedMax: 10,
                },
              },
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center  py-8 px-1 lg:w-[50%] m-auto font-sans bg-white">
          <select
            className="px-2 border border-slate-300 shadow-md rounded-lg text-sm"
            onChange={yearHanlderSecond}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
            <option value={'1401'}>{toPersianNumbers(1401)}</option>
          </select>
          <h2 className="text-center mt-3">
            <span>نمودار کاربری ها سال {toPersianNumbers(yearSecond)}</span>
          </h2>
          <Bar
            style={{
              padding: '10px',
            }}
            data={chartDataSecond}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: '',
                },
                tooltip: {
                  titleFont: { family: 'Vazir' },
                  bodyFont: { family: 'Vazir' },
                  boxPadding: 5,
                },

                legend: {
                  display: true,
                  labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                      family: 'Vazir',
                      size: 11,
                    },
                  },
                },
              },

              scales: {
                x: {
                  ticks: {
                    font: { family: 'Vazir', style: 'normal', size: 11 },
                  },
                },
                y: {
                  ticks: { font: 'Vazir' },

                  suggestedMax: 10,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default page;
