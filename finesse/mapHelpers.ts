export const setGet = (key: string, value: any, map: Map<string, any>) => {
  if (!map.has(key)) {
    map.set(key, value);
  }

  const mappedValue = map.get(key);
  return mappedValue;
};
