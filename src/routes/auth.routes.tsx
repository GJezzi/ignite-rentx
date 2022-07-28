import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';

import { RootsStackParamList } from '../@types/navigation';

export const AuthRoutes = () => {
  const { Navigator, Screen } = createNativeStackNavigator<RootsStackParamList>();

  return (
    <Navigator initialRouteName='Splash' screenOptions={{
      headerShown: false
    }}>
      <Screen name='Splash' component={Splash} />
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
      <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
      <Screen name='ConfirmationScreen' component={ConfirmationScreen} />
    </Navigator>
  )
}