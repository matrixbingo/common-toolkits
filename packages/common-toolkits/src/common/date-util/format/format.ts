import moment from "moment";
import { FormatDate } from "../../types";

/**
 * 格式化输出时间
 * @param format
 * @returns
 */
const format = (value: string, formatInt: string, formatOut = FormatDate.DAY_FORMAT) => {
  return moment(value, formatInt).format(formatOut);
}

export default format;
