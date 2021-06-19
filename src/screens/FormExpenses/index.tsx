import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import Toast from 'react-native-simple-toast';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { dateFormat } from '../../utils/dateFormat';
import { maskDate, maskPrice } from '../../utils/maskText';

import { Container } from './styles';

interface Expenses {
  _id: string;
  item: string;
  value: number;
  date: Date;
  additionalInfo: {
    complement: string;
  };
}

interface RouteParams {
  createdExpense: boolean;
  expense?: Expenses;
}

export function FormExpenses() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { createdExpense, expense } = params as RouteParams;

  const [value, setValue] = useState(expense?.value.toString() || '');
  const [date, setDate] = useState(format(new Date(), 'dd/MM/yyyy'));
  const [item, setItem] = useState(expense?.item || '');
  const [complement, setComplement] = useState(
    expense?.additionalInfo.complement || '',
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: createdExpense ? 'Atualizar despesa' : 'Adicionar despesa',
    });

    if (expense?.date) {
      setDate(format(new Date(expense.date), 'dd/MM/yyyy'));
    }
  }, [expense?.date, createdExpense, navigation]);

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
    const data = {
      value: parseFloat(value),
      item,
      date: dateFormat(date),
      additionalInfo: {
        complement,
      },
    };

    try {
      if (createdExpense && expense) {
        await api.put(`expenses/${expense?._id}`, data);
        Toast.show('Despesa atualizada com sucesso', Toast.LONG);

        navigation.reset({
          routes: [{ name: 'Home' }],
          index: 0,
        });
      } else {
        await api.post('expenses', data);
        Toast.show('Despesa cadastrada com sucesso', Toast.LONG);
      }

      setValue('');
      setDate(format(new Date(), 'dd/MM/yyyy'));
      setComplement('');
      setItem('');
      setLoading(false);
    } catch (error) {
      Toast.show('Erro ao cadastrar despesa, tente novamente', Toast.LONG);
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`expenses/${expense?._id}`);
      Toast.show('Despesa removida com sucesso', Toast.LONG);

      navigation.reset({
        routes: [{ name: 'Home' }],
        index: 0,
      });
    } catch (error) {
      Toast.show('Falha ao remover despesa', Toast.LONG);
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
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />

      <Button
        title="Salvar"
        onPress={handleSubmit}
        enabled={!loading}
        loading={loading}
      />

      {createdExpense && (
        <Button
          title="Excluir"
          onPress={handleDelete}
          loading={loading}
          enabled={!loading}
          style={{ marginTop: 5, backgroundColor: '#dd4040' }}
        />
      )}
    </Container>
  );
}
