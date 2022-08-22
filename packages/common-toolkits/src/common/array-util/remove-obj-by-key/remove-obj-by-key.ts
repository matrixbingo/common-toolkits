const removeObjByKey = (arr: { [K: string]: unknown }[] = [], item: { [K: string]: string | number }, K = 'id') => {
  return arr.filter((i) => i[K] !== item[K]);
};

export default removeObjByKey;
