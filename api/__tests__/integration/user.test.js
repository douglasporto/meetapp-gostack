import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../utils/truncate';

describe('Users', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('Should be able register', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/register')
      .send(user);
    expect(response.body).toHaveProperty('id');
  });
  it('Should not be able register when user exist', async () => {
    await factory.create('User', {
      email: 'douglasporto@brainmind.com.br',
    });
    const newUser = await factory.attrs('User', {
      email: 'douglasporto@brainmind.com.br',
    });
    const response = await request(app)
      .post('/register')
      .send(newUser);
    expect(response.body.error).toBe('User already exist');
  });
  it('Should not be able register when not send name', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'douglasporto@brainmind.com.br',
        password: '123456',
      });
    expect(response.body.error).toBe('name is a required field');
  });
  it('Should not be able register when not send email', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'Douglas',
        password: '123456',
      });
    expect(response.body.error).toBe('e-mail is a required field');
  });
  it('Should not be able register when send invalid email', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'Douglas',
        email: 'douglasporto',
        password: '123456',
      });
    expect(response.body.error).toBe('email must be a valid email');
  });
  it('Should not be able register when not send password', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'Douglas',
        email: 'douglasporto@brainmind.com.br',
      });
    expect(response.body.error).toBe('password is a required field');
  });
  it('Should not be able register when send password with less 6 characters', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'Douglas',
        email: 'douglasporto@brainmind.com.br',
        password: '123',
      });
    expect(response.body.error).toBe('password must be at least 6 characters');
  });
  it('Should not be able register when send password with more 10 characters', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        name: 'Douglas',
        email: 'douglasporto@brainmind.com.br',
        password: '12345678910',
      });
    expect(response.body.error).toBe('password must be at most 10 characters');
  });
  it('Should be able to return a list users', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
