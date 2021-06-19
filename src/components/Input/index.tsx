import React, { useRef } from 'react';

import { TextInput, TextInputProps, ViewStyle } from 'react-native';

import { Container, InputLabel, InputText } from './styles';

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  label: string;
}

export function Input({ label, containerStyle = {}, ...rest }: InputProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Container style={containerStyle}>
      <InputLabel>{label}</InputLabel>
      <InputText {...rest} importantForAutofill="no" ref={inputRef} />
    </Container>
  );
}
