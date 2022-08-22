import numeral from 'numeral';

const format = (text: any, format: string) => numeral(Number(text)).format(format);

export default format;
