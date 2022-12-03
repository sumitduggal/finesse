import { createHash } from "node:crypto";
import { setGet } from "./mapHelpers";
import { isMobile } from "./sorter";

export const styleKeyValueMap = new Map();
export const classnameStylesMap = new Map();

type NestedMap = Map<string, any>;

export const getHashedValue = (stringToHash: string) => {
  return createHash("md5").update(stringToHash).digest("base64");
};

const convertStyleToClassname = (style: any[]): string => {
  const [key, value] = style;
  const styleStringified = `${key}:${value}`;

  return setGet(
    styleStringified,
    getHashedValue(styleStringified),
    styleKeyValueMap
  );
};

const addNestedMap = (
  parentMap: NestedMap,
  key: string,
  value: NestedMap = new Map()
): NestedMap => {
  return setGet(key, value, parentMap);
};

const addCheckAllPossibleMediaQueries = (
  parentMap: NestedMap,
  mapkey: string,
  stylePrefixKeys: string[],
  classname: string,
  style: string[],
  mapvalue: NestedMap = new Map()
): NestedMap => {
  const [key, value] = style;
  const styleDeclaration = `${key}: ${value};`;
  const nestedMap = addNestedMap(parentMap, mapkey, mapvalue);

  const hasNestedDeclaration = stylePrefixKeys.length > 1;
  if (hasNestedDeclaration) {
    const isDarkMode = stylePrefixKeys.some((key) => key === "dark");
    if (isDarkMode) {
      const darkNestedMap = addNestedMap(nestedMap, "dark");
      setGet(classname, styleDeclaration, darkNestedMap);
    }
  } else {
    setGet(classname, styleDeclaration, nestedMap);
  }

  return nestedMap;
};

export const convertSingleStyleToClassName = (
  style: [string, any],
  stylePrefixKey?: string
): string => {
  const [key, value] = style;

  if (!Boolean(value)) return "";

  if (typeof value !== "object") {
    const styleModified = stylePrefixKey
      ? [`${stylePrefixKey}:${key}`, value]
      : style;

    const classname = convertStyleToClassname(styleModified);

    const stylePrefixKeys = stylePrefixKey?.split(":");
    if (stylePrefixKeys) {
      const isMobileQuery = stylePrefixKeys.some(isMobile);

      if (isMobileQuery) {
        addCheckAllPossibleMediaQueries(
          classnameStylesMap,
          "mobile",
          stylePrefixKeys,
          classname,
          style
        );
      }
    } else {
      setGet(classname, `${key}: ${value};`, classnameStylesMap);
    }

    return classname;
  } else {
    return createStyle(
      value,
      stylePrefixKey ? `${stylePrefixKey}:${key}` : key
    );
  }
};

export const createStyle = (
  styles: Record<string, any>,
  stylePrefixKey?: string
): string => {
  // console.log("createStyle > Object.entries(styles)", Object.entries(styles));

  return Object.entries(styles)
    .map((style) => convertSingleStyleToClassName(style, stylePrefixKey))
    .join(" ");
};
