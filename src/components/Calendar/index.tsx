import React from 'react';
import {Feather} from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Calendar as CustomCalendar, LocaleConfig } from 'react-native-calendars'

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
  today: 'Hoje', 
}

LocaleConfig.defaultLocale = 'pt-br';

export const Calendar = () => {
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
    />
  );
}
