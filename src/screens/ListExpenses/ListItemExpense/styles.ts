import styled from 'styled-components/native';

export const CardExpense = styled.TouchableOpacity`
  width: 100%;
  height: 80px;
  background: #e8eff5;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 0 20px;

  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const CardExpenseTitle = styled.Text`
  font-size: 16px;
  color: #1e64a1;
  font-weight: bold;
`;
