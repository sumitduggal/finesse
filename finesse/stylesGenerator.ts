import { createHash } from 'node:crypto';
import { setGet } from './mapHelpers';

export const styleKeyValueMap = new Map();
export const classNamesStylesMap = new Map();

export const getHashedValue = (stringToHash: string) => {
  return createHash('md5').update(stringToHash).digest('base64');
};

const getClassName = (style: any): string => {
  const [key, value] = style;
  const stringToHash = `${key}:${value}`;

  return setGet(stringToHash, getHashedValue(stringToHash), styleKeyValueMap);
};

const convertSingleStyleToClassName = (style: [string, any]): string => {
  const [key, value] = style;

  if (!Boolean(value)) return '';

  if (typeof value !== 'object') {
    const className = getClassName(style);
    const property = key.split(':').shift();

    setGet(className, `${property}: ${value};`, classNamesStylesMap);
    return className;
  } else {
    const [subKey, subValue] = Object.entries(value)[0];

    return createStyle({
      [`${key}:${subKey}`]: subValue,
    });
  }
};

export const createStyle = (styles: Record<string, any>): string => {
  console.log('createStyle > Object.entries(styles)', Object.entries(styles));

  return Object.entries(styles).map(convertSingleStyleToClassName).join(' ');
};
