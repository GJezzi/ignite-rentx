import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp} from '@react-navigation/native-stack'
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

import { RootsStackParamList } from '../../@types/navigation';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getDate } from '../../utils/getDate';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import theme from '../../styles/theme';

import { Container, 
  Header, 
  CarImages, 
  Content, 
  Details, 
  Description, 
  Brand, 
  Name, 
  Rent, 
  Period, 
  Price, 
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer
} from './styles';


type ScheduleDetailsScreenNavProps = NativeStackNavigationProp<RootsStackParamList, 'ScheduleDetails'>;
type ScheduleDetailsRouteProps = RouteProp<RootsStackParamList, 'ScheduleDetails'>

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  starDate: string;
  endDate: string;
}

export const ScheduleDetails = () => {
  const navigation = useNavigation<ScheduleDetailsScreenNavProps>();
  const route = useRoute<ScheduleDetailsRouteProps>();
  const { car, dates } = route.params as Params;

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const rentTotal = Number(dates.length * car.rent.price)

  const handleConfirmRental = async () => {
    const response = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...response.data.unavailable_dates,
      ...dates
    ];

    await api.post('/schedules_byuser', {
      user_id: 1,
      car
    })

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    .then(() => navigation.navigate('ScheduleComplete'))
    .catch(() => Alert.alert('Não foi possível efetuar o agendamento'))
  }

  const handleGoBack = () => {
    navigation.goBack();
  }


  useEffect(() => {
    setRentalPeriod({
      starDate: format(getDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [])
  
  return <Container>
      <Header>
          <BackButton onPress={handleGoBack}/>
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos}/>
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)}/> 
            ))
          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name='calendar' size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>
              DE
            </DateTitle>
            <DateValue>
              {rentalPeriod.starDate}
            </DateValue>
          </DateInfo>

          <Feather name='chevron-right' size={RFValue(10)} color={theme.colors.text_detail} />

          <DateInfo>
            <DateTitle>
              ATÉ
            </DateTitle>
            <DateValue>
              {rentalPeriod.endDate}
            </DateValue>
          </DateInfo>

        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button title='Alugar agora' onPress={handleConfirmRental} color={theme.colors.success}/>
      </Footer>
  </Container>;
}

