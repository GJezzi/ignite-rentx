import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp} from '@react-navigation/native-stack'
import { StatusBar, useWindowDimensions } from 'react-native';

import { RootsStackParamList } from '../../@types/navigation';

import { ConfirmButton } from '../../components/ConfirmButton';
import LogoSvg from '../../assets/logo_background_gray.svg';
import SuccessSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';

type ScheduleCompleteScreenNavProps = NativeStackNavigationProp<RootsStackParamList, 'ScheduleComplete'>;

export const ScheduleComplete = () => {
  const navigation  = useNavigation<ScheduleCompleteScreenNavProps>();
  const { width }  = useWindowDimensions()

  const handleRentalComplete = () => {
    navigation.navigate('Home');
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='transparent' 
        translucent
      />
      <LogoSvg width={width} />
      <Content>
        <SuccessSvg width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Message>Agora você só precisa ir{'\n'}até a concessionária da RENTX{'\n'}pegar o seu automóvel.</Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={handleRentalComplete}/>
      </Footer>
    </Container> 
  );
}

