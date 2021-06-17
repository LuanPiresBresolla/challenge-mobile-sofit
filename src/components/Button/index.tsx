import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  loading?: boolean;
}

export function Button({ title, loading, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      {!loading ? (
        <Title>{title}</Title>
      ) : (
        <ActivityIndicator color="#fff" size={25} />
      )}
    </Container>
  );
}
