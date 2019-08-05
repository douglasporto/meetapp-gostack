import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../utils/truncate';

describe('Auth', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able authenticate', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.body).toHaveProperty('token');
  });
  it('Should not be able authenticate when not send e-mail', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        password: '123123',
      });

    expect(response.body.error).toBe('e-mail is a required field');
  });
  it('Should not be able authenticate when send e-mail invalid', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'douglasporto',
        password: '123123',
      });

    expect(response.body.error).toBe('This e-mail is not valid');
  });
  it('Should not be able authenticate when user not exist', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'douglasporto@brainmind.com.br',
        password: '123123',
      });

    expect(response.body.error).toBe('User not exist');
  });
  it('Should not be able authenticate when not send password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'douglasporto@brainmin.com.br',
      });

    expect(response.body.error).toBe('password is a required field');
  });
  it('Should not be able authenticate when send password invalid', async () => {
    await factory.create('User', {
      email: 'douglasporto@brainmind.com.br',
      password: '123123',
    });
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'douglasporto@brainmind.com.br',
        password: '123456',
      });

    expect(response.body.error).toBe('Password incorrect');
  });
});
