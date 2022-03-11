import { eachDayOfInterval, format} from 'date-fns';

import {MarkedDatesProps, DayProps} from '.';
import {getDate} from '../../utils/getDate';
import theme from '../../styles/theme';

export const generateInterval = (startDate: DayProps, endDate: DayProps) => { 
  let interval: MarkedDatesProps = {};

  eachDayOfInterval({start: new Date(startDate.timestamp), end: new Date(endDate.timestamp)})
  .forEach((item) => { 
    const date = format(getDate(item), 'yyyy-MM-dd');
    interval = {
      ...interval,
      [date]: {
        color: startDate.dateString === date || endDate.dateString === date ?
          theme.colors.main : theme.colors.main_light,
        textColor: startDate.dateString === date || endDate.dateString === date ?
          theme.colors.main_light : theme.colors.main,
      }
    }

  });
  return interval;
}