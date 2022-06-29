import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedule } from '../screens/Schedule';
import { ScheduleDetails } from '../screens/ScheduleDetails';
import { ScheduleComplete } from '../screens/ScheduleComplete';
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash';

import { RootsStackParamList } from '../@types/navigation';

export const StackRoutes = () => {
  const { Navigator, Screen } = createNativeStackNavigator<RootsStackParamList>();

  return (
    <Navigator initialRouteName='Splash' screenOptions={{
      headerShown: false
    }}>
      <Screen name='Splash' component={Splash} />
      <Screen name='Home' component={Home} options={{gestureEnabled: false}} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Schedule' component={Schedule} />
      <Screen name='ScheduleDetails' component={ScheduleDetails} />
      <Screen name='ScheduleComplete' component={ScheduleComplete} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  )
}