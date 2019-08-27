import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import signIn from './pages/SignIn';
import signUp from './pages/SignUp';

export default createAppContainer(
  createSwitchNavigator({
    signIn,
    signUp,
  }),
);
