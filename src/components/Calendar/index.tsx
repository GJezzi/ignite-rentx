import React from 'react';
import { Calendar as CustomCalendar, LocaleConfig, CalendarProps  } from 'react-native-calendars'
import { useTheme } from 'styled-components';
import {Feather} from '@expo/vector-icons';

import { generateInterval } from './generateInterval'
import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDatesProps { 
  [date:string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean;
  }
}

interface DayProps {
  dateString: string;
  day: string;
  month: string;
  year: string;
  timestamp: string;
}

const Calendar = ({ markedDates, onDayPress }: CalendarProps) => {
  const theme = useTheme();
  return (
    <CustomCalendar
      renderArrow={(direction) => 
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        monthTextColor: theme.colors.title,
        textMonthFontFamily: theme.fonts.arch_600,
        textMonthFontSize: 20,
        textDayFontSize: 15,
        dayTextColor: theme.colors.title,
        textDayFontFamily: theme.fonts.inter_400,
        textDayHeaderFontFamily: theme.fonts.arch_600,
        textDayHeaderFontSize: 10,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType='period'
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { Calendar, MarkedDatesProps, DayProps, generateInterval }
