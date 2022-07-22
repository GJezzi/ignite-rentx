import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup'

import { BackButton } from '../../../components/BackButton';
import { Input } from '../../../components/Input';
import { Bullet } from '../../../components/Bullet';

import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from './styles';
import { Button } from '../../../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootsStackParamList } from '../../../@types/navigation';

type SignUpFirstStepNavigationProp = NativeStackNavigationProp<RootsStackParamList, 'SignUpFirstStep'>;

export const SignUpFirstStep = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [doc, setDoc] = useState<string>('');

  const navigation = useNavigation<SignUpFirstStepNavigationProp>();

  const handleGoBack = () => { 
    navigation.goBack();
  };

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        doc: Yup.string().required('CNH é obrigatória'),
        email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = {
        name,
        email,
        doc
      }

      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', {user: data});
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Opa!', error.message);
      } else {
        Alert.alert(
          'Erro na hora de de cadastrar o usuário.', 
          'Verifique suas credenciais e tente novamente'
        )
      }
    }
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
            <FormTitle>1. Dados</FormTitle>
            <Input 
              iconName='user' 
              placeholder='Nome'
              onChangeText={setName}
              value={name}
            />
            <Input 
              iconName='mail' 
              placeholder='E-mail' 
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
            />
            <Input 
              iconName='credit-card' 
              placeholder='CNH' 
              keyboardType='numeric'
              onChangeText={setDoc}
              value={doc}
            />
          </Form>
          <Button title='Proximo' onPress={handleNextStep}/>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
