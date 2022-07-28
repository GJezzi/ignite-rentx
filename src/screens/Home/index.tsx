import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';

import { RootsStackParamList } from '../../@types/navigation';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/CarDTO';

import { api } from '../../services/api';

import { Container, Header, TotalCars, HeaderContent, CarList, styles } from './styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootsStackParamList, 'Home'>;

const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export const Home = () => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsFloatButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: positionY.value },
        { translateX: positionX.value }
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){}
  });

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car });
  };

  const handleOpenMyCars = () => {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [])
  
  return( 
    <Container>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='transparent' 
        translucent
      />
        <Header>
          <HeaderContent>
            <Logo width={RFValue(108)} height={RFValue(12)}/>
            {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
          </HeaderContent>
        </Header>
        {loading ? <LoadAnimation/> :
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
        }
        <PanGestureHandler onGestureEvent={onGestureEvent} >
          <Animated.View style={[myCarsFloatButtonStyle, styles.floatButtonView]}>
            <AnimatedButton onPress={handleOpenMyCars} style={styles.floatButtonStyle}>
              <Ionicons 
                name='ios-car-sport' 
                size={32} 
                color={theme.colors.white}
              />
            </AnimatedButton>
          </Animated.View>
        </PanGestureHandler>
        
        
    </Container>
  )
}





