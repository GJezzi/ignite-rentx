import styled from 'styled-components/native';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { CarDTO } from '../../dtos/CarDTO';
import { RectButton } from 'react-native-gesture-handler';

import theme from '../../styles/theme';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Header = styled.View`
    width: 100%;
    height: 113px;

    background-color: ${({ theme }) => theme.colors.header};

    justify-content: flex-end;
    padding: 32px 24px;
`;

export const TotalCars = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({theme }) => theme.fonts.arch_400};
    color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>).attrs({
    contentContainerStyle: {
        padding: 24,
    },
    showsVerticalScrollIndicator: false,
})``;

export const styles = StyleSheet.create({
  floatButtonView: {
    position: 'absolute',
    bottom: 13,
    right: 22,
  },
  floatButtonStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.main,
  }
})