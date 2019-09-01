/* MODULES */
import styled from 'styled-components/native';

/* COMPONENTS */
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const Form = styled.ScrollView.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #d44059;
`;
