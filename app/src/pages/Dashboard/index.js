/* MODULES */
import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { format, subMonths, addMonths, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* SERVICES */
import api from '~/services/api';

/* STYLES */
import {
  Container,
  ContainerHeader,
  List,
  ButtonDate,
  TextDate,
} from './styles';

/* COMPONENTS */
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetapp from '~/components/Meetapp';

export default function Dashboard() {
  const [meetapps, setMeetapps] = useState([]);
  const [date, setDate] = useState(new Date());
  const [refreshing] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, 'yyyy MMMM', { locale: en }),
    [date]
  );
  useEffect(() => {
    async function loadMeetapps() {
      try {
        const response = await api.get('meetapps', { params: { date } });
        const data = response.data.map(m => ({
          ...m,
          formattedDate: format(parseISO(m.date), "MMMM d', at' hh'h'mm", {
            locale: en,
          }),
        }));
        setMeetapps(data);
      } catch (e) {
        const error = e.response;
        Alert.alert(
          'Error',
          !!error && error.data.error
            ? `Ops! ${error.data.error}`
            : 'An error has occurred, check your internet and try again'
        );
      }
    }
    loadMeetapps();
  }, [date]);

  /* FUNCTIONS  */
  function handlePrevDay() {
    setDate(subMonths(date, 1));
  }

  function handleNextDay() {
    setDate(addMonths(date, 1));
  }
  function handleRefresh() {
    setDate(subMonths(date, 0));
  }
  async function handleSubscribe(id) {
    try {
      await api.post(`subscriptions/${id}`);
      handleRefresh();
      Alert.alert('Succcess', 'You have subscribed to this meetup!');
    } catch (e) {
      const error = e.response;
      Alert.alert(
        'Error',
        !!error && error.data.error
          ? `Ops! ${error.data.error}`
          : 'An error has occurred, try again'
      );
    }
  }

  async function handleUninscribe(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      handleRefresh();
      Alert.alert('Success', 'Meepapp successfully canceled');
    } catch (e) {
      console.tron.log(e);
      const error = e.response;
      Alert.alert(
        'Error',
        !!error && error.data.error
          ? `Ops! ${error.data.error}`
          : 'An error has occurred, try again'
      );
    }
  }

  return (
    <>
      <Background>
        <Header />
        <Container>
          <ContainerHeader>
            <ButtonDate onPress={handlePrevDay}>
              <Icon name="navigate-before" size={36} color="#fff" />
            </ButtonDate>
            <TextDate>{dateFormatted}</TextDate>
            <ButtonDate onPress={handleNextDay}>
              <Icon name="navigate-next" size={36} color="#fff" />
            </ButtonDate>
          </ContainerHeader>
          <List
            data={meetapps}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetapp
                data={item}
                handleSubscribe={() => handleSubscribe(item.id)}
                handleUninscribe={() => handleUninscribe(item.id)}
              />
            )}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        </Container>
      </Background>
    </>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'MeetApps',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
