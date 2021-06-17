import React from 'react';
import { TextInputProps, ViewStyle } from 'react-native';

import { Container, InputLabel, InputText } from './styles';

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

export function Input({ containerStyle = {}, ...rest }: InputProps) {
  return (
    <Container style={containerStyle}>
      <InputLabel>E-mail</InputLabel>
      <InputText {...rest} />
    </Container>
  );
}
