import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 30,
    showsVerticalScrollIndicator: false,
  },
})``;

// export const ButtonDate = styled.Button``;

export const ContainerHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  align-self: center;
  margin: 10px 0;
`;

export const ButtonDate = styled(RectButton)``;
export const TextDate = styled.Text`
  color: #fff;
  font-size: 24px;
  margin: 0 15px;
  font-weight: bold;
`;

export const NoMeetapps = styled.View`
  align-items: center;
  align-content: center;
  margin-top: 40px;
`;

export const NoMeetappsText = styled.Text`
  color: #fff;
  font-size: 18px;
  padding: 10px 0;
`;
