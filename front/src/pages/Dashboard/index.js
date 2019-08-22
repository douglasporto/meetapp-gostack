import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, subMonths, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  MdAddCircleOutline,
  MdChevronLeft,
  MdChevronRight,
  MdFlag,
} from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';
import { Container, NoMeetapps, MeetappCard } from './styles';

export default function Dashboard() {
  const [meetapps, setMeetapps] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetapps() {
      const response = await api.get('meetapps', { params: { date } });
      const data = response.data.map(m => ({
        ...m,
        formattedDate: format(parseISO(m.date), "d 'de' MMMM ', às' hh'h'mm", {
          locale: pt,
        }),
      }));
      setMeetapps(data);
    }
    loadMeetapps();
  }, [date]);

  function handlePrevDay() {
    setDate(subMonths(date, 1));
  }

  function handleNextDay() {
    setDate(addMonths(date, 1));
  }

  return (
    <Container>
      <header>
        <strong>Meus Meetapps</strong>
        <button type="button" onClick={() => history.push('/new')}>
          <MdAddCircleOutline />
          Novo Meetapp
        </button>
      </header>

      {meetapps.length > 0 ? (
        <ul>
          {meetapps.map(meetapp => (
            <MeetappCard key={String(meetapp.id)}>
              <Link to={`details/${meetapp.id}`}>
                {!meetapp.canceled_at ? (
                  <strong>{meetapp.title}</strong>
                ) : (
                  <span>
                    <strike>{meetapp.title}</strike>
                  </span>
                )}
                <time>{meetapp.formattedDate}</time>
                <MdChevronRight size={24} color="#fff" />
              </Link>
            </MeetappCard>
          ))}
        </ul>
      ) : (
        <NoMeetapps>
          <MdFlag color="#fff" size={40} />
          <span>Ops, nenhum meetapp para este mês!</span>
        </NoMeetapps>
      )}
      <footer>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </footer>
    </Container>
  );
}
