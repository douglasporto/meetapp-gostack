import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  margin-bottom: 20px;
`;
export const Content = styled.View`
  background: #fff;
  padding: 20px;
`;
export const Banner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 140px;
  align-content: stretch;
`;
export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
`;
export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  align-content: center;
  padding: 5px 0;
`;
export const InfoText = styled.Text`
  color: #999999;
  font-size: 13px;
  margin-left: 5px;
`;

export const ViewButtom = styled.View`
  margin-top: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
