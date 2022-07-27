import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedule } from '../screens/Schedule';
import { ScheduleDetails } from '../screens/ScheduleDetails';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';

import { RootsStackParamList } from '../@types/navigation';

export const StackRoutes = () => {
  const { Navigator, Screen } = createNativeStackNavigator<RootsStackParamList>();

  return (
    <Navigator initialRouteName='Home' screenOptions={{
      headerShown: false
    }}>
      <Screen name='Splash' component={Splash} />
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
      <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
      <Screen name='Home' component={Home} options={{gestureEnabled: false}} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Schedule' component={Schedule} />
      <Screen name='ScheduleDetails' component={ScheduleDetails} />
      <Screen name='ConfirmationScreen' component={ConfirmationScreen} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  )
}