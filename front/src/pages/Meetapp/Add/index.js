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
          `Erro ao atualizar criar MeetApp, [${response.body.error}]`
        );
      history.push('/');
      toast.success('MeeApp criado com sucesso');
    } catch (e) {
      toast.error('Erro ao criar MeetApp, confira seus dados');
    }
  }
  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Banner name="banner_id" />
        <Input name="title" placeholder="Titulo do meetapps" />
        <Input multiline name="description" placeholder="Descrição" />
        <SelectDate selected={date} setSelected={setDate} name="date" />
        <Input name="location" placeholder="Local" />

        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Criar um MeetApp!
        </button>
        <Link to="/">Voltar</Link>
      </Form>
    </Container>
  );
}
