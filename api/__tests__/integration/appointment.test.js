import request from 'supertest';
// import { zonedTimeToUtc } from 'date-fns-timezone';
import { zonedTimeToUtc } from 'date-fns-tz';
import { addHours } from 'date-fns';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../utils/truncate';

describe('Appointment', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able create appointment', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/appointments')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        date: '2019-10-10T18:00:00-03:00',
      });

    expect(response.status).toBe(201);
  });
  it('Should not be able create appointment when not send date', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/appointments')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send();

    expect(response.body.error).toBe('date is a required field');
  });
  it('Should not be able create appointment when not send invalid date', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/appointments')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        date: '31-01-1990',
      });

    expect(response.status).toBe(400);
  });
  it('Should not be able create appointment when send past date', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/appointments')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        date: '2018-10-10T18:00:00-03:00',
      });

    expect(response.body.error).toBe('Past dates are not permitted');
  });
  it('Should not be able create appointment when date already exist', async () => {
    const user = await factory.create('User');

    const [, response] = await Promise.all([
      await request(app)
        .post('/appointments')
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          date: '2019-10-10T18:00:00-03:00',
        }),
      await request(app)
        .post('/appointments')
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          date: '2019-10-10T18:00:00-03:00',
        }),
    ]);

    expect(response.body.error).toBe('Appointment date is not available');
  });

  it('Should be able return date list', async () => {
    const user = await factory.create('User');

    const [, response] = await Promise.all([
      await request(app)
        .post('/appointments')
        .set('Authorization', `Bearer ${user.generateToken()}`)
        .send({
          date: '2019-10-10T18:00:00-03:00',
        }),
      await request(app)
        .get('/appointments')
        .set('Authorization', `Bearer ${user.generateToken()}`),
    ]);

    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('Should be able to destroy date', async () => {
    const user = await factory.create('User');
    const date = await request(app)
      .post('/appointments')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        date: '2019-10-10T18:00:00-03:00',
      });
    const response = await request(app)
      .delete(`/appointments/${date.body.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toHaveProperty('canceled_at');
  });

  it(`Should not be able to destroy date when user don't have permission`, async () => {
    const [user1, user2] = await Promise.all([
      await factory.create('User', {
        email: 'douglasporto@brainmind.com.br',
      }),
      await factory.create('User', {
        email: 'douglasporto2@brainmind.com.br',
      }),
    ]);
    const date = await request(app)
      .post('/appointments')
      .set('Authorization', `Bearer ${user1.generateToken()}`)
      .send({
        date: '2019-10-10T18:00:00-03:00',
      });
    const response = await request(app)
      .delete(`/appointments/${date.body.id}`)
      .set('Authorization', `Bearer ${user2.generateToken()}`);

    expect(response.body.error).toBe(
      `You don't have permission to cancel this appointment`
    );
  });

  it('Should not be able to destroy date with 2 hours before', async () => {
    const user = await factory.create('User');

    const znDate = zonedTimeToUtc(new Date(), 'America/Sao_Paulo');
    const addedDate = addHours(znDate, 1);
    const date = await request(app)
      .post('/appointments')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        date: addedDate,
      });
    const response = await request(app)
      .delete(`/appointments/${date.body.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body.error).toBe(
      'You can only cancel appointments 2 hours in advance'
    );
  });

  it('Should not be able to destroy date when send id date unexist', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .delete(`/appointments/15456321`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body.error).toBe('Appointment not found');
  });
});
