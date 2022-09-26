import moment from 'moment';
import { FormatDate } from '../../types';

const workday = ( format = FormatDate.DAY_FORMAT ): String => {
  const isoWeekday = moment().isoWeekday();
  if([6,7].includes(isoWeekday)){
    return moment().add((0 - (isoWeekday - 5)), 'days').format(format);
  }
  return moment().format(format);
}

export default workday;
