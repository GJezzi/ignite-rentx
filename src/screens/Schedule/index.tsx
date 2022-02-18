import React from 'react';
import { StatusBar } from 'react-native';
import {useTheme} from 'styled-components'

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg'

import { Container, 
  Header, 
  Title, 
  RentalPeriod, 
  DateInfo, 
  DateTitle, 
  DateValue,
  Content, 
  Footer } from './styles';

export const Schedule: React.FC = () => {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='transparent' 
        translucent
      />
      <Header>
        <BackButton color={theme.colors.white} onPress={()=>{}}/>
        <Title>
          Escolha uma{'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>
          <ArrowSvg/>
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar/>
      </Content>
      <Footer>
        <Button title='Confirmar' onPress={() => {}}/>
      </Footer>
    </Container>
  )
}

