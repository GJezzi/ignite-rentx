import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import GasolineSvg from '../../assets/gasoline.svg'
import theme from '../../styles/theme';

import { Container, Details, Brand, Name, About, Rent, Period, Price, Type, CarImage  } from './styles';

interface CarData {
    brand: string;
    name: string;
    rent:{
        period: string;
        price: string;
    },
    thumbnail: string;
};

interface Props extends RectButtonProps {
   data: CarData;
};

export const Car = ({ data, ...rest }: Props) => {

  return (
    <Container {...rest}>
        <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>
            <About>
                <Rent>
                    <Period>{data.rent.period}</Period>
                    <Price>{`R$ ${data.rent.price}`}</Price>
                </Rent>
                <Type>
                    <GasolineSvg color={theme.colors.text_detail}/>
                </Type>
            </About>
        </Details>
        <CarImage resizeMode='contain' source={{ uri: data.thumbnail }} />
    </Container>
  )
};

