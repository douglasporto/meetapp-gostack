import { toast } from 'react-toastify';

export const errorMessage = function errorMessage(e) {
  const error = e.response;
  toast.error(
    !!error && error.data.error
      ? `Ops! ${error.data.error}`
      : 'An error has occurred, try again'
  );
};
