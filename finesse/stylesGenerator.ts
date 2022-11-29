import { createHash } from "node:crypto";
import { setGet } from "./mapHelpers";

export const styleKeyValueMap = new Map();
export const classnameStylesMap = new Map();

export const getHashedValue = (stringToHash: string) => {
  return createHash("md5").update(stringToHash).digest("base64");
};

const convertStyleToClassname = (style: any): string => {
  const [key, value] = style;
  const styleStringified = `${key}:${value}`;

  return setGet(
    styleStringified,
    getHashedValue(styleStringified),
    styleKeyValueMap
  );
};

const convertSingleStyleToClassName = (style: [string, any]): string => {
  const [key, value] = style;

  if (!Boolean(value)) return "";

  if (typeof value !== "object") {
    const classname = convertStyleToClassname(style);
    const property = key.split(":").shift();

    setGet(classname, `${property}: ${value};`, classnameStylesMap);
    return classname;
  } else {
    const [subKey, subValue] = Object.entries(value)[0];

    return createStyle({
      [`${key}:${subKey}`]: subValue,
    });
  }
};

export const createStyle = (styles: Record<string, any>): string => {
  console.log("createStyle > Object.entries(styles)", Object.entries(styles));

  return Object.entries(styles).map(convertSingleStyleToClassName).join(" ");
};
