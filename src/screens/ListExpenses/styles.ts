import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Expenses } from '.';

export const Container = styled.View`
  flex: 1;
`;

export const ExpensesList = styled(FlatList as new () => FlatList<Expenses>)`
  padding: 32px 24px 16px;
`;
