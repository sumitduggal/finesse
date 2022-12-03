import { classnameStylesMap, createStyle } from "./finesse";

const singleLevelStyles = {
  color: "green",
  background: "red",
};

const nestedStyles = {
  background: "red",

  mobile: {
    background: "red",
  },
};

const doubleNestedStyles = {
  background: "blue",

  mobile: {
    background: "red",

    dark: {
      background: "red",
      color: "green",
    },
  },
};

createStyle(singleLevelStyles);
console.log("--- --- ---");

createStyle(nestedStyles);
console.log("--- --- ---");

createStyle(doubleNestedStyles);
console.log("--- --- ---");

const logNested = (maybeNestedArray: any[]) => {
  maybeNestedArray.map((item) => {
    const [key, value] = item;
    if (typeof value === "object") {
      logNested([...value]);
    } else {
      console.log(key, value);
    }
  });
};

console.log([...classnameStylesMap]);
logNested([...classnameStylesMap]);
