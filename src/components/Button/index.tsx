import React from 'react';

import { Container, Title } from './styles';

interface Props {
	title: string;
	color?: string;
	onPress: () => void
}

export const Button = ({title, color, ...rest}: Props) => {
  return (
		<Container {...rest} color={color}>
			<Title>{title}</Title>
		</Container>
	)
}

