const getLocalStorageData = (storageCode: string, defaultData: Record<string|number, any>) => {
  if (window.localStorage) {
    let result = {};
    const data = window.localStorage.getItem(storageCode);
    if (data && data !== 'undefined') {
      result = JSON.parse(data);
    } else if (defaultData) {
      return defaultData;
    }
    if (result) {
      return result;
    }
  }
  return defaultData;
};

const setLocalStorageData = (storageCode: string, storageData: Record<string|number, any>) => {
  if (window.localStorage) {
    window.localStorage.removeItem(storageCode);
    window.localStorage.setItem(storageCode, JSON.stringify(storageData));
  }
};

const setLocalStorageString = (storageCode: string, storageString: string) => {
  if (window.localStorage) {
    window.localStorage.removeItem(storageCode);
    window.localStorage.setItem(storageCode, storageString);
  }
};

const getLocalStorageString = (storageCode: string, defaultString: string) => {
  if (window.localStorage) {
    const str = window.localStorage.getItem(storageCode);
    if (!str) return defaultString;
    return str;
  }
  return defaultString;
};

export default { getLocalStorageData, setLocalStorageData, setLocalStorageString, getLocalStorageString } as const;

