import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { 
  TouchableWithoutFeedback,
  Keyboard, 
  KeyboardAvoidingView, 
  StatusBar, 
  Alert 
} from 'react-native';

import { useAuth } from '../../hooks/auth'
import * as Yup from 'yup';
import { RootsStackParamList } from '../../@types/navigation';

import { Button } from '../../components/Button'
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import theme from '../../styles/theme';
import { 
  Container, 
  Header, 
  Title, 
  Subtitle, 
  Footer, 
  Form 
} from './styles';

type SignInNavigationProp = NativeStackNavigationProp<RootsStackParamList, 'SignIn'>;

export const SignIn = () => {
  const navigation = useNavigation<SignInNavigationProp>();

  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = () => { 
    navigation.navigate('SignUpFirstStep');
  };

  const handleSignIn = async () => { 
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um E-mail válido'),
        password: Yup.string()
        .required('Senha obrigatória'),
      })
  
      await schema.validate({email, password});

      signIn({ email, password });
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Opa!', error.message);
      } else {
        Alert.alert(
          'Erro na hora de efetuar o Login.', 
          'Verifique suas credenciais e tente novamente'
        )
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent/>
            <Header>
              <Title>Estamos{'\n'}quase lá.</Title>
              <Subtitle>Faça seu login para começar{'\n'}uma experiência incrível.</Subtitle>
            </Header>
            <Form>
              <Input 
                iconName='mail' 
                placeholder='E-mail' 
                keyboardType='email-address' 
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={setEmail}
                value={email}
              />
              <PasswordInput 
                iconName='lock' 
                placeholder='Senha' 
                secureTextEntry
                onChangeText={setPassword}
                value={password}
              />
            </Form>
            <Footer>
              <Button 
                title='Login' 
                onPress={handleSignIn} 
                enabled={true} 
                loading={false}
              />
              <Button 
                title='Criar conta gratuita' 
                onPress={handleSignUp} 
                color={theme.colors.background_secondary} 
                light
              />
            </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
