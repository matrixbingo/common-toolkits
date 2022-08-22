import lodash from 'lodash';

const truncate = (value: string, limit = 10): string => lodash.truncate(value, { length: limit, omission: '...' });

export default truncate;
