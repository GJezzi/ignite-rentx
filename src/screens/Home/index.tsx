import React, { useEffect, useState } from 'react';import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components'
import { NativeStackNavigationProp} from '@react-navigation/native-stack'
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons'

import { RootsStackParamList } from '../../@types/navigation';

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car'
import { Load } from '../../components/Load'

import { CarDTO } from '../../dtos/CarDTO';

import { api } from '../../services/api';

import { Container, Header, TotalCars, HeaderContent, CarList, MyCarsFloatButton } from './styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootsStackParamList, 'Home'>;

export const Home = () => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

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
            <TotalCars>Total de 12 carros</TotalCars>
          </HeaderContent>
        </Header>
        {loading ? <Load/> :
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
        }
        <MyCarsFloatButton onPress={handleOpenMyCars}>
          <Ionicons name='ios-car-sport' size={32} color={theme.colors.white}/>
        </MyCarsFloatButton>
    </Container>
  )
}





