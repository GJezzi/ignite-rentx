import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedule } from '../screens/Schedule';
import { ScheduleDetails } from '../screens/ScheduleDetails';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { MyCars } from '../screens/MyCars'

import { RootsStackParamList } from '../@types/navigation';

export const AppStackRoutes = () => {
  const { Navigator, Screen } = createNativeStackNavigator<RootsStackParamList>();

  return (
    <Navigator initialRouteName='Home' screenOptions={{
      headerShown: false
    }}>
      <Screen name='Home' component={Home} options={{gestureEnabled: false}} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Schedule' component={Schedule} />
      <Screen name='ScheduleDetails' component={ScheduleDetails} />
      <Screen name='ConfirmationScreen' component={ConfirmationScreen} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  )
}