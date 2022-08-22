import moment from "moment";
import { FormatDate } from "../../types";

const dateIsValid = (date: string, format = FormatDate.DAY_FORMAT) => moment(date, format, true).isValid();

export default dateIsValid;
