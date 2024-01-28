import colorLib from '@kurkle/color';
import { valueOrDefault } from '../../node_modules/chart.js/dist/helpers.cjs';
import { DateTime } from 'luxon';
import { toPersianNumbers } from './toPersianNumbers';

// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
var _seed = Date.now();

export function srand(seed) {
  _seed = seed;
}

export function rand(min, max) {
  min = valueOrDefault(min, 0);
  max = valueOrDefault(max, 0);
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

export function numbers(config) {
  var cfg = config || {};
  var min = valueOrDefault(cfg.min, 0);
  var max = valueOrDefault(cfg.max, 100);
  var from = valueOrDefault(cfg.from, []);
  var count = valueOrDefault(cfg.count, 8);
  var decimals = valueOrDefault(cfg.decimals, 8);
  var continuity = valueOrDefault(cfg.continuity, 1);
  var dfactor = Math.pow(10, decimals) || 0;
  var data = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    const x = rand(min, max);
    value = (from[i] || 0) + x;
    if (x <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

export function points(config) {
  const xs = this.numbers(config);
  const ys = this.numbers(config);
  return xs.map((x, i) => ({ x, y: ys[i] }));
}

export function bubbles(config) {
  return this.points(config).map((pt) => {
    pt.r = this.rand(config.rmin, config.rmax);
    return pt;
  });
}

export function labels(config) {
  var cfg = config || {};
  var min = cfg.min || 0;
  var max = cfg.max || 100;
  var count = cfg.count || 8;
  var step = (max - min) / count;
  var decimals = cfg.decimals || 8;
  var dfactor = Math.pow(10, decimals) || 0;
  var prefix = cfg.prefix || '';
  var values = [];
  var i;

  for (i = min; i < max; i += step) {
    values.push(prefix + Math.round(dfactor * i) / dfactor);
  }

  return values;
}

// const MONTHS = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

export const MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export function months(config) {
  var cfg = config || {};
  var count = cfg.count || 12;
  var section = cfg.section;
  var values = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }
  return values;
}

const COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba',
];

export function color(index) {
  return COLORS[index % COLORS.length];
}

export function transparentize(value, opacity) {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

const NAMED_COLORS = [
  CHART_COLORS.red,
  CHART_COLORS.orange,
  CHART_COLORS.yellow,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.purple,
  CHART_COLORS.grey,
];

export function namedColor(index) {
  return NAMED_COLORS[index % NAMED_COLORS.length];
}

export function newDate(days) {
  return DateTime.now().plus({ days }).toJSDate();
}

export function newDateString(days) {
  return DateTime.now().plus({ days }).toISO();
}

export function parseISODate(str) {
  return DateTime.fromISO(str);
}

export const requestsByYear = (year, allRequsets) => {
  const result = allRequsets?.filter(
    (req) => req.persianDate.slice(0, 4) === year
  );
  return result;
};
///////
export const requestsByType = (allRequsets, year, type) => {
  const requestsPerYear = requestsByYear(year, allRequsets);
  const result = requestsPerYear?.filter((item) => item.type === type);
  return result;
};

export const formattedRequestByType = (allRequsets, year, type) => {
  const requestsPerType = requestsByType(allRequsets, year, type);
  const result = requestsPerType?.map((item) => ({
    id: item.id,
    year: item.persianDate.slice(0, 4),
    month: item.persianDate.slice(5, item.persianDate.lastIndexOf('/')),
  }));

  return result;
};

export const requestCountByMonth = (allRequsets, year, type) => {
  const res = formattedRequestByType(allRequsets, year, type);
  let finalArray = [];
  if (res) {
    for (let index = 1; index <= 12; index++) {
      let counter = 0;
      for (const item of res) {
        if (toPersianNumbers(index) === item.month) {
          counter = counter + 1;
        }
      }
      finalArray.push(counter);
    }
  }
  return finalArray;
};
///////
export const requestsByCategory = (allRequsets, year, category) => {
  const requestsPerYear = requestsByYear(year, allRequsets);
  const result = requestsPerYear?.filter((item) => item.category === category);
  return result;
};

export const formattedRequestByCategory = (allRequsets, year, category) => {
  const requestsPerCategory = requestsByCategory(allRequsets, year, category);
  const result = requestsPerCategory?.map((item) => ({
    id: item.id,
    year: item.persianDate.slice(0, 4),
    month: item.persianDate.slice(5, item.persianDate.lastIndexOf('/')),
  }));

  return result;
};

export const requestCategoryCountByMonth = (allRequsets, year, category) => {
  const res = formattedRequestByCategory(allRequsets, year, category);
  let finalArray = [];
  if (res) {
    for (let index = 1; index <= 12; index++) {
      let counter = 0;
      for (const item of res) {
        if (toPersianNumbers(index) === item.month) {
          counter = counter + 1;
        }
      }
      finalArray.push(counter);
    }
  }
  return finalArray;
};
