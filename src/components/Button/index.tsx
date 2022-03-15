import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler';


import { Container, Title } from './styles';

interface Props extends RectButtonProps {
	title: string;
	color?: string;
  enabled?: boolean;
  isLoading?: boolean;
}

export const Button = ({
    title, 
    color, 
    enabled = true, 
    isLoading = false, 
    ...rest 
  }: Props) => {
  const theme = useTheme();

  return (
		<Container 
      {...rest} 
      color={color ? color : theme.colors.main} 
      enabled={enabled}
      style={{opacity: (enabled === false || isLoading === true) ? .5 : 1}}
    > 
    {
      isLoading ? 
        <ActivityIndicator color={theme.colors.shape} /> : <Title>{title}</Title>
    }
		</Container>
	)
}

