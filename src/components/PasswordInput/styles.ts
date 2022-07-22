import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

interface InputProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<InputProps>`
  width: 55px;
  height: 56px;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  background-color: ${({theme}) => theme.colors.background_secondary};

  ${({isFocused, theme}) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const InputText = styled(TextInput)<InputProps>`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background_secondary};
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.inter_400};
  font-size: ${RFValue(15)}px;
  padding: 0 24px;
  
  ${({isFocused, theme}) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  padding-right: 16px;
  background-color: ${({theme}) => theme.colors.background_secondary};
`;