import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/CarDTO';

import { api } from '../../services/api';

import { 
  Container, 
  Header, 
  Title, 
  Subtitle, 
  Content, 
  Appointments, 
  AppointmentsTitle, 
  AppointmentsQuantity,
  AppointmentsList,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export const MyCars = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const handleGoBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchCars()
  }, []);

  return(
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
        <Subtitle>
          Conforto, segurança e praticidade.
        </Subtitle>
      </Header>
      {isLoading ? <LoadAnimation/> : 
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <AppointmentsList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => 
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign 
                      name='arrowright' 
                      size={20} 
                      color={theme.colors.title} 
                      style={{ marginHorizontal: 10 }} 
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            }
          />
        </Content>
      }
    </Container>
  );
}

export default MyCars;