import React from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

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
  const theme = useTheme();

  const { car } = route.params as Params;
  const scrollY = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler(event =>{
    scrollY.value = event.contentOffset.y
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0]
      )
    }
  })

  const handleRentalPeriod = () => {
    navigation.navigate('Schedule' , { car });
  }

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent' 
        translucent
      />

      <Animated.View style={[
        headerStyleAnimation, {
          backgroundColor: theme.colors.background_secondary
        }]} >
        <Header>
          <BackButton onPress={handleGoBack}/>
        </Header>
        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos}/>
          </CarImages>
        </Animated.View>
      </Animated.View>
      
      <Animated.ScrollView 
        contentContainerStyle={{
          paddingHorizontal: 24,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
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
      </Animated.ScrollView>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleRentalPeriod} />
      </Footer>
    </Container>
  )
}

