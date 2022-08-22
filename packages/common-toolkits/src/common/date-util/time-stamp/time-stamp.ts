import { FormatDate } from "../../types";
import currFormat from "../curr-format/curr-format";

/**
 * 获取时间戳
 * @returns
 */
const timeStamp = (format = FormatDate.SECONDS_FORMAT): string => currFormat(format);

export default timeStamp;
