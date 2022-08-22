import moment from "moment";
import { FormatDate } from "../../types";

/**
 * 格式化输出当前时间
 * @param format
 * @returns
 */
const currFormat = (format = FormatDate.SECONDS_FORMAT) => moment().format(format);

export default currFormat;
