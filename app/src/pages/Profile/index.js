import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';
// import { Container } from './styles';

export default function Profile() {
  return (
    <>
      <Header />
      <Background />
    </>
  );
}
Profile.navigationOptions = {
  tabBarLabel: 'My Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
