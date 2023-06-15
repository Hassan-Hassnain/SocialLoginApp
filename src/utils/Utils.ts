import {colors, fw} from '~/theme';

import DeviceInfo from 'react-native-device-info';
import {I18nManager} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import _camelCase from 'lodash/camelCase';
import memoizeOne from 'memoize-one';

// import moment from 'moment/min/moment-with-locales';

// @ts-ignore

// @ts-ignore

// import {VIMEO_LINK} from './Constants';

export const isNetworkAvailable = async () => {
  const response = await NetInfo.fetch();
  return response.isConnected;
};

export const camelizeKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

export const isEmpty = (text: string | null | undefined): boolean => {
  return !!!text || text.length === 0;
};

const withZero = (number: number) => {
  return (number < 10 ? '0' : '') + number;
};

export const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return withZero(day) + '-' + withZero(month) + '-' + withZero(year);
};

export const formatTime = (
  time: Date,
  format: TimeFormat = 'HH:MM',
  multiline = false,
): string => {
  let hh = time.getHours();
  const mm = time.getMinutes();
  if (format === 'HH:MM AA') {
    const aa = hh < 12 ? 'AM' : 'PM';
    if (hh > 12) hh = hh - 12;
    return withZero(hh) + ':' + withZero(mm) + (multiline ? '\n' : ' ') + aa;
  } else {
    return withZero(hh) + ':' + withZero(mm);
  }
};

export const stringToDate = (
  date: string,
  delimiter = '-',
  format: DateFormat = 'DD-MM-YYYY',
) => {
  if (date && date !== '' && !date.includes(delimiter)) return new Date();
  const formatLowerCase = format.toLowerCase();
  const formatItems = formatLowerCase.split(delimiter);
  const dateItems = date.split(delimiter);
  const dayIndex = formatItems.indexOf('dd');
  const monthIndex = formatItems.indexOf('mm');
  const yearIndex = formatItems.indexOf('yyyy');
  let month = parseInt(dateItems[monthIndex]);
  month -= 1;
  const formatedDate = new Date(
    parseInt(dateItems[yearIndex]),
    month,
    parseInt(dateItems[dayIndex]),
  );
  return formatedDate;
};

export const stringToTime = (
  time: string,
  delimiter = ':',
  format: TimeFormat = 'HH:MM',
): Date | undefined => {
  if (time && time !== '' && !time.includes(delimiter)) return undefined;
  const formatLowerCase = format.toLowerCase();
  const formatItems = formatLowerCase.split(delimiter);
  const timeItems = time.split(delimiter);
  const hourIndex = formatItems.indexOf('hh');
  const minutesIndex = formatItems.indexOf('mm');
  let hours = parseInt(timeItems[hourIndex]);
  const minutes = parseInt(timeItems[minutesIndex]);
  if (format == 'HH:MM AA') {
    // 12 hour format
    const aa = timeItems[formatItems.indexOf('aa')];
    if (aa === 'PM' || aa === 'pm') {
      hours = hours + 12;
    }
  }
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};

export const convertFrom24to12Hour = (
  time: string | undefined,
  multiline = false,
): string => {
  if (!isEmpty(time)) {
    // @ts-ignore
    const t = stringToTime(time, ':', 'HH:MM');
    return !!t ? formatTime(t, 'HH:MM AA', multiline) : '';
  }
  return '';
};

export const dateDiff = (first: Date, second: Date) => {
  const DAY = 3600 * 24 * 1000;
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  const d2 = second.getTime() / DAY;
  const d1 = first.getTime() / DAY;
  return Math.round(d2 - d1);
};

export const calculateAge = memoizeOne((dateString: string): number => {
  const birthday = +stringToDate(dateString);
  return ~~((Date.now() - birthday) / 31557600000);
});

export const convertStringToNumber = (value: string | null): number => {
  if (value) {
    return Number(value);
  } else {
    return 0;
  }
};

export const isRTL = (): boolean => I18nManager.isRTL;

export const formatEmailAsHidden = (email: string): string => {
  if (!isEmpty(email)) {
    const parts = email.split('@');
    return `${parts[0].charAt(0)}****@${parts[1]}`;
  }
  return '';
};

export const delay = (time: number) =>
  new Promise((resolve: any) => setTimeout(resolve, time));

export const isNumber = (text: string) => /^\d+$/.test(text);

export const dateAfterMinutes = (min: number): Date => {
  const dt = new Date();
  dt.setMinutes(dt.getMinutes() + min);
  return dt;
};

export const randomId = () => {
  return new Date().getTime();
};

export const shadow = (depth = isTablet() ? 3 : 2): any => ({
  elevation: depth * 2,
  shadowOffset: {width: 0, height: fw(depth)},
  shadowOpacity: depth * 0.14,
  shadowRadius: depth * 1,
  shadowColor: depth === 0 ? colors.transparent : colors.grey,
});

// start a new thread and wait for 'timeout' long
export const wait = (timeout: number) => {
  return new Promise((resolve: any) => setTimeout(resolve, timeout));
};

/**
 * Calculates difference between 2 dates in days date1 - date2
 * @param date1 date as in Date object or ISO formatted string
 * @param date2 date as in Date object or ISO formatted string
 * @returns no of days between dates provided
 */
export const diffInDays = (
  date1: Date | string | undefined,
  date2: Date | string | undefined,
) => {
  if (!date1 || !date2) return undefined;
  const d1: any = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2: any = typeof date2 === 'string' ? new Date(date2) : date2;
  const diffTime = d1 - d2;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Calculates difference between 2 dates in hours date1 - date2
 * @param date1 date as in Date object or ISO formatted string
 * @param date2 date as in Date object or ISO formatted string
 * @returns no of hours between dates provided
 */
export const diffInHours = (
  date1: Date | string | undefined,
  date2: Date | string | undefined,
) => {
  if (!date1 || !date2) return undefined;
  const d1: any = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2: any = typeof date2 === 'string' ? new Date(date2) : date2;
  const diffTime = d1 - d2;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60));
  return diffDays;
};

/**
 * Inverts the color.
 * @param hex main color
 * @param bw if you want black and white inversion only
 * @returns inverted color in hex form
 */
export function invertColor(hex: string, bw: boolean) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
  // invert color components and pad each with zeros and return
  return (
    '#' +
    padZero((255 - r).toString(16)) +
    padZero((255 - g).toString(16)) +
    padZero((255 - b).toString(16))
  );
}
/**
 * converts color in the form of rgb(255,255,255) to hex #FFFFFF
 */
export const rgbToHex = (color: string) => {
  const rgb: number[] = color
    .substring(color.indexOf('(') + 1, color.indexOf(')'))
    .split(',')
    .map(c => Number(c));
  return (
    '#' +
    rgb
      .map(x => {
        if (x < 1) {
          const rounded = Math.round(x * 100) / 100;
          const alpha = Math.round(rounded * 255);
          const hexAlpha = (alpha + 0x10000)
            .toString(16)
            .substr(-2)
            .toUpperCase();
          return hexAlpha;
        }
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

/**
 * converts color in the form of #FFFFFF to hex rgb(255,255,255, 1)
 */
export function hexToRgba(hex: string, opacity: number) {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      `,${opacity})`
    );
  }
  throw new Error('Bad Hex');
}

function padZero(str: string, len = 2) {
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

/**
 * Inverts the color.
 * @param hex main color
 * @param bw if you want black and white inversion only
 * @returns inverted color in hex form
 */
export function findStatusbarContentMode(
  backgroundColor: string,
): 'light-content' | 'dark-content' {
  let hex = backgroundColor.startsWith('#')
    ? backgroundColor
    : rgbToHex(backgroundColor);

  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  // In case there is a rgba color which will have 8 digits
  if (hex.length !== 6 && hex.length !== 8) {
    throw new Error('Invalid HEX color.');
  }
  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186
    ? 'dark-content'
    : 'light-content';
}

export function getHtmlTextSizeMapping(tag: string): Scale {
  switch (tag) {
    case 'h1':
      return 'xlarge';
    case 'h2':
      return 'large';
    case 'h3':
      return 'medium';
    case 'h4':
      return 'small';
    case 'h5':
      return 'xsmall';
    case 'h6':
      return 'tiny';
    case 'p':
      return 'large';
    case 'span':
      return 'large';
    default:
      return 'medium';
  }
}

export const isTablet = (): boolean => DeviceInfo.isTablet();

export const getLicenseNumber = (license: string): string => {
  let l = license;
  // check if it is not a link
  // https://qr.emenu.ae/2o6jyok7y8
  if (license.startsWith('http')) {
    const splits = license.split('/');
    l =
      splits[splits.length - 1] === ''
        ? splits[splits.length - 2]
        : splits[splits.length - 1];
  }
  return l;
};

export const deviceIsTablet = (): boolean => DeviceInfo.isTablet();
