import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';

import { api } from '../../services/api';
import { ListItemExpense } from './ListItemExpense';

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

export function ListExpenses() {
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadExpenses() {
    if (loading) {
      console.log('loading');
      return;
    }

    console.log('load api');
    setLoading(true);
    const response = await api.get(`expenses`, {
      params: {
        page,
        perPage: 10,
      },
    });

    setExpenses(state => [...state, ...response.data]);
    setPage(state => state + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size={50} color="#00dfab" />
        <Text style={{ fontSize: 20 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <Container>
      <FlatList
        style={{ padding: '8%' }}
        data={expenses}
        keyExtractor={expense => expense._id}
        showsVerticalScrollIndicator={false}
        onEndReached={expenses.length === 10 ? loadExpenses : undefined}
        onEndReachedThreshold={expenses.length === 10 ? 0.2 : undefined}
        renderItem={({ item }) => <ListItemExpense expense={item} />}
      />
    </Container>
  );
}
