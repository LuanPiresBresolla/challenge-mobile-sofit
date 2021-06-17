import React, { useState } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';

import { Container, Title, Content } from './styles';

export function SignIn() {
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    try {
      await signIn({ email });
      navigate('Home');
    } catch (error) {
      Alert.alert('Erro ao realizar login, tente novamente');
    }
    setLoading(false);
  }

  return (
    <Container>
      <View style={{ marginBottom: 30 }}>
        <Title>
          Bem-vindo {'\n'}Informe seu e-mail{'\n'}Para fazer login
        </Title>
      </View>

      <Title style={{ fontSize: 50, marginBottom: 30 }}>💰📈</Title>

      <Content>
        <Input
          containerStyle={{ marginBottom: 20 }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholderTextColor="#fff"
          placeholder="Digite seu e-mail..."
          keyboardType="email-address"
        />
        <Button title="Entrar" onPress={handleSignIn} loading={loading} />
      </Content>
    </Container>
  );
}
