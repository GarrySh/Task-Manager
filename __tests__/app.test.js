import request from 'supertest';
import app from '../app';

describe('Simple tests', () => {
  let server;

  beforeEach(() => {
    server = app().listen();
  });

  test('GET 200 main page', async () => {
    request.agent(server)
      .get('/')
      .expect(200);
  });

  test('GET 200 users page', async () => {
    request.agent(server)
      .get('/users')
      .expect(200);
  });

  test('GET 404 undefined page', async () => {
    request.agent(server)
      .get('/undefined')
      .expect(404);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});
