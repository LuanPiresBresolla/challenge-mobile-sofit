import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 8%;
  flex: 1;
  align-items: center;
`;

export const CardOption = styled.TouchableOpacity`
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

export const CardOptionTitle = styled.Text`
  font-size: 20px;
  color: #1e64a1;
  font-weight: bold;
`;
