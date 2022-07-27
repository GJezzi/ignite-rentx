import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootsStackParamList } from '../../../@types/navigation';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import { api } from '../../../services/api';

import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from './styles';
import theme from '../../../styles/theme';

type SignUpSecondStepNavigationProp = NativeStackNavigationProp<RootsStackParamList, 'SignUpSecondStep'>;
type SignUpSecondStepRouteProp = RouteProp<RootsStackParamList, 'SignUpSecondStep'>

interface Params {
  user: {
    name: string;
    email: string;
    doc: string;
  }
}

export const SignUpSecondStep = () => {
  const navigation = useNavigation<SignUpSecondStepNavigationProp>();
  const route = useRoute<SignUpSecondStepRouteProp>();
  const { user } = route.params as Params;


  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleGoBack = () => { 
    navigation.goBack();
  };

  const handleRegister = async() => {
    if(!password || !confirmPassword) {
      return Alert.alert('Informe a senha e a confirmação');
    }

    if(password !== confirmPassword) {
      Alert.alert('As senhas não são iguais');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.doc,
      password,
    }).then(() => {
      navigation.navigate('ConfirmationScreen', {
        title: 'Conta criada!',
        message: `Agora é só fazer login\ne aproveitar`,
        nextScreenRoute: 'SignIn',
      })
     }).catch(() => {
      Alert.alert('Opa!', 'Não foi possível cadastrar o usuário');
     });

    
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack}/>
            <Steps>
              <Bullet active/>
              <Bullet/>
            </Steps>
          </Header>
          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </Subtitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput 
                iconName='lock' 
                placeholder='Senha' 
                secureTextEntry
                onChangeText={setPassword}
                value={password}
              />
           <PasswordInput 
                iconName='lock' 
                placeholder='Repetir senha' 
                secureTextEntry
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
          </Form>
          <Button title='Cadastrar' onPress={handleRegister} color={theme.colors.success}/>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
