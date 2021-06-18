import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Container, CardOption, CardOptionTitle } from './styles';

export function Home() {
  const { navigate } = useNavigation();

  return (
    <Container>
      <CardOption
        activeOpacity={0.7}
        onPress={() => navigate('CreateExpenses')}
      >
        <CardOptionTitle>Adicionar despesa</CardOptionTitle>
        <Icon name="edit" color="#1e64a1" size={30} />
      </CardOption>

      <CardOption activeOpacity={0.7} onPress={() => navigate('ListExpenses')}>
        <CardOptionTitle>Listar despesas</CardOptionTitle>
        <Icon name="file-text" color="#1e64a1" size={30} />
      </CardOption>
    </Container>
  );
}
