import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';

import animation from '../../../animation.json';

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
          Bem-vindo {'\n'}Informe seu e-mail{'\n'}para realizar login
        </Title>
      </View>

      {/* <Title style={{ fontSize: 50, marginBottom: 30 }}>💰📈</Title> */}
      <Lottie
        source={animation}
        resizeMode="contain"
        autoPlay
        loop
        style={{ width: 450 }}
      />

      <Content>
        <Input
          label="E-mail"
          containerStyle={{ marginBottom: 20 }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholderTextColor="#1e6494"
          placeholder="Digite seu e-mail..."
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleSignIn}
        />
        <Button
          title="Entrar"
          onPress={handleSignIn}
          loading={loading}
          enabled={!loading}
        />
      </Content>
    </Container>
  );
}
