import React from 'react';
import { Accessory } from '../../components/Accessory';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from '../../assets/speed.svg';
import accelSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasSvg from '../../assets/gasoline.svg';
import gearSvg from '../../assets/exchange.svg';;
import peopleSvg from '../../assets/people.svg';;


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
import { Button } from '../../components/Button';

export const CarDetails = () => {
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
        
        <About>
          Este é automóvel desportivo. 
          Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. 
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={()=>{}}/>
      </Footer>
  </Container>;
}

