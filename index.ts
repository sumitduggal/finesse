import { classNamesStylesMap, createStyle } from './finesse';

const singleLevelStyles = {
  color: 'green',
  background: 'red',
};

const nestedStyles = {
  background: 'red',
};

const doubleNestedStyles = {
  background: {
    mobile: {
      dark: 'red',
    },
  },
};

console.log('   ', singleLevelStyles, createStyle(singleLevelStyles));
console.log('     ', nestedStyles, createStyle(nestedStyles));
console.log('     ', doubleNestedStyles, createStyle(doubleNestedStyles));

console.log([...classNamesStylesMap]);
