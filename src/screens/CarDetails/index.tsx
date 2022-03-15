import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp} from '@react-navigation/native-stack'

import { RootsStackParamList } from '../../@types/navigation';

import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';

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
  About, 
  Accessories,
  Footer
} from './styles';

type CarDetailsScreenNavigationProp = NativeStackNavigationProp<RootsStackParamList, 'CarDetails'>;
type CarDetailsScreenRouteProp = RouteProp<RootsStackParamList, 'CarDetails'>;

interface Params {
  car: CarDTO
}

export const CarDetails = () => {
  const navigation = useNavigation<CarDetailsScreenNavigationProp>();
  const route = useRoute<CarDetailsScreenRouteProp>();
  const { car } = route.params as Params;

  const handleRentalPeriod = () => {
    navigation.navigate('Schedule' , { car });
  }

  const handleGoBack = () => {
    navigation.goBack();
  }

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
        <About>
         {car.about}
        </About>
      </Content>
      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleRentalPeriod} />
      </Footer>
  </Container>;
}

