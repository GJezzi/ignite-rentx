import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp} from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { RootsParamList } from '../../@types/navigation';

import speedSvg from '../../assets/speed.svg';
import accelSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasSvg from '../../assets/gasoline.svg';
import gearSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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

type ScheduleDetailsScreenNavProps = NativeStackNavigationProp<RootsParamList, 'ScheduleDetails'>;

export const ScheduleDetails = () => {
  const navigation = useNavigation<ScheduleDetailsScreenNavProps>();

  const handleConfirmRental = () => {
    navigation.navigate('ScheduleComplete');
  }

  return <Container>
      <Header>
          <BackButton onPress={() =>{}}/>
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={['https://e7.pngegg.com/pngimages/49/600/png-clipart-black-audi-convertible-coupe-2018-audi-a5-convertible-car-audi-s5-audi-a5-cabrio-black-car-convertible-car.png']}/>
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory name='380km/h' icon={speedSvg}/> 
          <Accessory name='3.2s' icon={accelSvg}/> 
          <Accessory name='800 HP' icon={forceSvg}/> 
          <Accessory name='Gasolina' icon={gasSvg}/> 
          <Accessory name='Auto' icon={gearSvg}/> 
          <Accessory name='2 pessoas' icon={peopleSvg}/> 
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
              18/06/21
            </DateValue>
          </DateInfo>

          <Feather name='chevron-right' size={RFValue(10)} color={theme.colors.text_detail} />

          <DateInfo>
            <DateTitle>
              ATÉ
            </DateTitle>
            <DateValue>
              18/06/21
            </DateValue>
          </DateInfo>

        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button title='Alugar agora' onPress={handleConfirmRental} color={theme.colors.success}/>
      </Footer>
  </Container>;
}

