import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { CardExpense, CardExpenseTitle } from './styles';

interface Expenses {
  _id: string;
  item: string;
  value: number;
  date: Date;
  additionalInfo: {
    complement: string;
  };
}

interface ListItemExpenseProps {
  expense: Expenses;
}

export function ListItemExpense({ expense }: ListItemExpenseProps) {
  return (
    <CardExpense activeOpacity={0.7}>
      <View style={{ alignItems: 'flex-start' }}>
        <CardExpenseTitle numberOfLines={1} style={{ fontWeight: 'normal' }}>
          {expense.item}
        </CardExpenseTitle>
        <CardExpenseTitle numberOfLines={1}>
          R$ {expense.value}
        </CardExpenseTitle>
      </View>
      <Icon name="chevron-right" color="#00dfab" size={30} />
    </CardExpense>
  );
}
