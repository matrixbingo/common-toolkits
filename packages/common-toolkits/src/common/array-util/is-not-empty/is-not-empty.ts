import { isEmpty } from 'lodash';

const isNotEmpty = (arr: any): boolean => !isEmpty(arr) && arr?.length > 0;

export default isNotEmpty;
