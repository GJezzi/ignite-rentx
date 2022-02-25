import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedule } from '../screens/Schedule';
import { ScheduleDetails } from '../screens/ScheduleDetails';
import { ScheduleComplete } from '../screens/ScheduleComplete';

import { RootsParamList } from '../@types/navigation';

export const StackRoutes = () => {
  const { Navigator, Screen } = createNativeStackNavigator<RootsParamList>();

  return (
    <Navigator initialRouteName='Home' screenOptions={{
      headerShown: false
    }}>
      <Screen name='Home' component={Home} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Schedule' component={Schedule} />
      <Screen name='ScheduleDetails' component={ScheduleDetails} />
      <Screen name='ScheduleComplete' component={ScheduleComplete} />
    </Navigator>
  )
}