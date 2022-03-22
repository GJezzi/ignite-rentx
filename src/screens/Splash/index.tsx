import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import Animated, 
  { 
    Extrapolate, 
    interpolate, 
    runOnJS, 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming 
  } from 'react-native-reanimated';

import { RootsStackParamList } from '../../@types/navigation';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from  '../../assets/logo.svg';

import { Container } from './styles';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootsStackParamList, 'Splash'>

export const Splash = () => {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, 
        [0, 50], 
        [1, 0]
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 25, 50],
        [0, .3, 1]
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  const appStart = () => {
    navigation.navigate('Home');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50, 
      { duration: 1500 },
      () => {
        'worklet'
        runOnJS(appStart)();
      }
    );
  },[])

  return (
    <Container>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='transparent' 
        translucent
      />

      <Animated.View style={[brandStyle, { position: 'absolute' }]} >
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}

