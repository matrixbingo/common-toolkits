
const createNumberArray = (size: number, bin = 1) => {
  const arr: number[] = [];
  let i = bin;
  do {
    arr.push(i);
    i += 1;
  } while (i < size);
  return arr;
};

export default createNumberArray;
