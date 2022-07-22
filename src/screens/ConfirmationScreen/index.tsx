import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp} from '@react-navigation/native-stack'
import { StatusBar, useWindowDimensions } from 'react-native';

import { RootsStackParamList } from '../../@types/navigation';

import { ConfirmButton } from '../../components/ConfirmButton';
import LogoSvg from '../../assets/logo_background_gray.svg';
import SuccessSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';

type ConfirmationScreenScreenNavProps = NativeStackNavigationProp<RootsStackParamList, 'ConfirmationScreen'>;
type ConfirmationScreenRouteProps = RouteProp<RootsStackParamList, 'ConfirmationScreen'>

interface Params {
  title: string;
  message: string;
  nextScreenRoute: keyof RootsStackParamList;
}

export const ConfirmationScreen = () => {
  const navigation  = useNavigation<ConfirmationScreenScreenNavProps>();
  const route = useRoute<ConfirmationScreenRouteProps>();
  const { title, message, nextScreenRoute } = route.params as Params;
  
  const { width }  = useWindowDimensions()

  const handleNextScreen = () => {
    navigation.navigate(nextScreenRoute);
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
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={handleNextScreen}/>
      </Footer>
    </Container> 
  );
}

