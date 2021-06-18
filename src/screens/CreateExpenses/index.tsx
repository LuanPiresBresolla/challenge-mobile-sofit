import React, { useState } from 'react';
import { Alert } from 'react-native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { dateFormat } from '../../utils/dateFormat';
import { maskDate, maskPrice } from '../../utils/maskText';

import { Container } from './styles';

export function CreateExpenses() {
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [item, setItem] = useState('');
  const [complement, setComplement] = useState('');
  const [loading, setLoading] = useState(false);

  function handlePrice(text: string) {
    const valueFormatted = maskPrice(text);
    setValue(valueFormatted);
  }

  function handleFormatDate(text: string) {
    const dateFormatted = maskDate(text);
    setDate(dateFormatted);
  }

  async function handleSubmit() {
    setLoading(true);
    const expense = {
      value: parseFloat(value),
      item,
      date: dateFormat(date),
      additionalInfo: {
        complement,
      },
    };

    try {
      await api.post('expenses', expense);

      Alert.alert('Despesa cadastrada com sucesso');

      setValue('');
      setDate('');
      setComplement('');
      setItem('');
      setLoading(false);
    } catch (error) {
      Alert.alert('Erro ao cadastrar despesa, tente novamente');
      setLoading(false);
    }
  }

  return (
    <Container>
      <Input
        label="Data"
        containerStyle={{ marginBottom: 10 }}
        keyboardType="numeric"
        onChangeText={text => handleFormatDate(text)}
        value={date}
      />

      <Input
        label="Descrição"
        containerStyle={{ marginBottom: 10 }}
        onChangeText={text => setItem(text)}
        value={item}
      />

      <Input
        label="Valor"
        containerStyle={{ marginBottom: 10 }}
        keyboardType="numeric"
        onChangeText={text => handlePrice(text)}
        value={value}
      />

      <Input
        label="Complemento"
        containerStyle={{ marginBottom: 50 }}
        onChangeText={text => setComplement(text)}
        value={complement}
      />

      <Button title="Salvar" onPress={handleSubmit} loading={loading} />
    </Container>
  );
}
