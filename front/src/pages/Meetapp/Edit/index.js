import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';

import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from '~/styles/FormMeetapp';

import Banner from '~/components/Banner';
import SelectDate from '~/components/DatePicker';

import schema from '~/validations/Meetapp';

export default function NewMeetapp({ match }) {
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);
  const [meetapp, setMeetapp] = useState(true);
  const [meetappId, setMeetappId] = useState(match.params.id);

  async function handleSubmit(data) {
    try {
      const response = await api.put(`meetapps/${meetappId}`, data);
      setMeetappId(response.data.id);
      toast.success('MeeApp successfully updated');
    } catch (e) {
      const error = e.response;
      toast.error(
        !!error && error.data.error
          ? `Ops! ${error.data.error}`
          : 'An error has occurred, try again'
      );
    }
  }
  useEffect(() => {
    async function loadingMeetapp() {
      try {
        const { data } = await api.get(`meetapps/${meetappId}`);
        setMeetapp({
          ...data,
          date: parseISO(data.date),
        });
      } catch (e) {
        const error = e.response;
        toast.error(
          !!error && error.data.error
            ? `Ops! ${error.data.error}`
            : 'An error has occurred, try again'
        );
      } finally {
        setLoading(false);
      }
    }
    loadingMeetapp();
  }, [meetappId]);
  return (
    <Container>
      {loading ? (
        <div className="loading">
          <Loader type="Grid" color="#f94d6a" width={164} height={164} />
        </div>
      ) : (
        <Form initialData={meetapp} schema={schema} onSubmit={handleSubmit}>
          <Banner name="banner_id" />
          <Input name="title" placeholder="Title" />
          <Input multiline name="description" placeholder="Description" />
          <SelectDate selected={date} setSelected={setDate} name="date" />
          <Input name="location" placeholder="Location" />

          <button type="submit">
            <MdAddCircleOutline size={20} color="#fff" />
            Edit MeetApp!
          </button>
          <Link to={`/meetapp-details/${meetappId}`}>Back</Link>
        </Form>
      )}
    </Container>
  );
}

NewMeetapp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
