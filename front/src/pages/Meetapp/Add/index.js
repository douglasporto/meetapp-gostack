import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from '~/styles/FormMeetapp';

import Banner from '~/components/Banner';
import SelectDate from '~/components/DatePicker';

import schema from '~/validations/Meetapp';

export default function NewMeetapp() {
  const [date, setDate] = useState();
  async function handleSubmit(data) {
    try {
      const response = await api.post('meetapps', data);
      if (response.status !== 201)
        toast.error(
          `An error has occurred, try again, [${response.body.error}]`
        );
      history.push('/');
      toast.success('MeeApp successfully created');
    } catch (e) {
      const error = e.response;
      toast.error(
        !!error && error.data.error
          ? `Ops! ${error.data.error}`
          : 'An error has occurred, try again'
      );
    }
  }
  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Banner name="banner_id" />
        <Input name="title" placeholder="Title" />
        <Input multiline name="description" placeholder="Description" />
        <SelectDate selected={date} setSelected={setDate} name="date" />
        <Input name="location" placeholder="Location" />

        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Create MeetApp!
        </button>
        <Link to="/">Back</Link>
      </Form>
    </Container>
  );
}
