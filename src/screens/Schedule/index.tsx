import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp} from '@react-navigation/native-stack'
import { format } from 'date-fns';
import { useTheme } from 'styled-components'

import { RootsStackParamList } from '../../@types/navigation';
import { getDate } from '../../utils/getDate';
import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar,
  DayProps,
  MarkedDatesProps,
  generateInterval
} from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg'

import { Container, 
  Header, 
  Title, 
  RentalPeriod, 
  DateInfo, 
  DateTitle, 
  DateValue,
  Content, 
  Footer
} from './styles';

type ScheduleScreenNavProp = NativeStackNavigationProp<RootsStackParamList, 'Schedule'>;
type ScheduleScreenRouteProp = RouteProp<RootsStackParamList, 'Schedule'>;

interface RentalPeriodProps {
  starDateFormatted: string;
  endDateFormatted: string;
}

interface Params {
  car: CarDTO
}

export const Schedule: React.FC = () => {
  const navigation = useNavigation<ScheduleScreenNavProp>();
  const route = useRoute<ScheduleScreenRouteProp>();
  const { car } = route.params as Params;
  const theme = useTheme();

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);

  const handleRentalConfirm = () => {
    navigation.navigate('ScheduleDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  const handleGoBack = () => {
    navigation.goBack();
  }

  const handleChangeDate = (date: DayProps) => { 
    let startDate = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let endDate = date;

    if(startDate.timestamp > endDate.timestamp) {
      startDate = endDate;
      endDate = startDate;
    }

    setLastSelectedDate(endDate);
    const interval = generateInterval(startDate, endDate);
    setMarkedDates(interval);

    const firstDay = Object.keys(interval)[0];
    const lastDay = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      starDateFormatted: format(getDate(new Date(firstDay)), 'dd/MM/yyyy'),
      endDateFormatted: format(getDate(new Date(lastDay)), 'dd/MM/yyyy')
    }) 
  }

  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle='light-content' 
          backgroundColor='transparent' 
          translucent
        />
        <BackButton color={theme.colors.white} onPress={handleGoBack}/>
        <Title>
          Escolha uma{'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.starDateFormatted}>{rentalPeriod.starDateFormatted}</DateValue>
          </DateInfo>
          <ArrowSvg/>
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endDateFormatted}>{rentalPeriod.endDateFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>
      <Footer>
        <Button 
          title='Confirmar' 
          onPress={handleRentalConfirm}
          enabled={!!rentalPeriod.starDateFormatted}
        />
      </Footer>
    </Container>
  )
}

