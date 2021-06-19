import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

import { api } from '../../services/api';
import { ListItemExpense } from './ListItemExpense';

import { Container, ExpensesList } from './styles';

export interface Expenses {
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
  const [loadingScreen, setLoadingScreen] = useState(true);

  async function loadExpenses() {
    if (loading) {
      return;
    }

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
    setLoadingScreen(false);
  }

  useEffect(() => {
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingScreen) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size={50} color="#00dfab" />
        <Text style={{ fontSize: 20 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <Container>
      <ExpensesList
        data={expenses}
        contentContainerStyle={{ paddingBottom: '15%' }}
        keyExtractor={expense => expense._id}
        showsVerticalScrollIndicator={false}
        onEndReached={expenses.length === 10 ? loadExpenses : undefined}
        onEndReachedThreshold={expenses.length === 10 ? 0.2 : undefined}
        renderItem={({ item }) => <ListItemExpense expense={item} />}
      />
    </Container>
  );
}
