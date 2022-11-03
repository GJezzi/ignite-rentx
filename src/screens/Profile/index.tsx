import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather'
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';

import { 
  Container, 
  Header, 
  HeaderTop, 
  HeaderTitle, 
  LogoutButton, 
  PhotoContainer, 
  Photo,
  PhotoButton,
  Content,
  ContentHeader,
  Option,
  OptionTitle, 
} from './styles';

export const Profile = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')

  const handleBack = () => {
    navigation.goBack();
  }

  const handleLogout = () => {

  }

  const handleOptionChange = (selectedOption: 'dataEdit' | 'passwordEdit') => {
    setOption(selectedOption)
  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack}/>
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleLogout}>
            <Feather name='power' size={24} color={theme.colors.shape}/>
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/10424568?v=4' }}/>
          <PhotoButton onPress={() => {}}>
            <Feather name='camera' size={24} color={theme.colors.shape}/>
          </PhotoButton>
        </PhotoContainer>
      </Header>
      <Content>
        <ContentHeader>
          <Option
            onPress={() => handleOptionChange('dataEdit')}
            active={option === 'dataEdit'}
          >
            <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
          </Option>
          <Option 
            onPress={() => handleOptionChange('passwordEdit')}
            active={option === 'passwordEdit'}
          >
            <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
          </Option>
        </ContentHeader>
      </Content>
    </Container>
  );
}

