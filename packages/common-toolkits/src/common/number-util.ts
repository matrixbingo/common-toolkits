import numeral from 'numeral';

const numberformat = (text: any, format: string) => numeral(Number(text)).format(format);

export default {
  numberformat
} as const;
