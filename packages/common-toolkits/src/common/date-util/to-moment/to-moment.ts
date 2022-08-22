import moment, { DurationInputArg2, Moment, unitOfTime } from 'moment';
import { DateTypeInterface, FormatDate } from '../../types';

const toMoment = ( value: DateTypeInterface, format = FormatDate.DAY_FORMAT ): Moment => moment.isMoment(value) ? value : moment(value, format);

export default toMoment;
