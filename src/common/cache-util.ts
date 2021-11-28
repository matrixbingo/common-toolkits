export const getLocalStorageData = (storageCode: string, defaultData: Record<string|number, unknown>) => {
  if (window.localStorage) {
    let result = {};
    const data = window.localStorage.getItem(storageCode);
    if (data) {
      result = JSON.parse(data);
    } else if (defaultData) {
      return defaultData;
    }
    if (result) {
      return result;
    }
  }
  return null;
};

export const setLocalStorageData = (storageCode: string, storageData: Record<string|number, unknown>) => {
  if (window.localStorage) {
    window.localStorage.removeItem(storageCode);
    window.localStorage.setItem(storageCode, JSON.stringify(storageData));
  }
};
