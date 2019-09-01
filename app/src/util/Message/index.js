import { showMessage } from 'react-native-flash-message';

export default function ErrorMessage(e) {
  const error = e.response;
  showMessage({
    type: 'danger',
    message:
      !!error && error.data.error
        ? `Ops! ${error.data.error}`
        : 'An error has occurred, check your internet and try again',
  });
}
