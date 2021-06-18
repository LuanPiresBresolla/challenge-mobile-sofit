import React from 'react';
import { TextInputProps, ViewStyle } from 'react-native';

import { Container, InputLabel, InputText } from './styles';

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  label: string;
}

export function Input({ label, containerStyle = {}, ...rest }: InputProps) {
  return (
    <Container style={containerStyle}>
      <InputLabel>{label}</InputLabel>
      <InputText {...rest} importantForAutofill="no" />
    </Container>
  );
}
