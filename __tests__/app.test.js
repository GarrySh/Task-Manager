import request from 'supertest';
import app from '../app';

describe('requests', () => {
  let server;

  beforeEach(() => {
    server = app().listen();
  });

  test('GET 200', async () => {
    request.agent(server)
      .get('/')
      .expect(200);
  });

  test('GET 404', async () => {
    request.agent(server)
      .get('/undefined')
      .expect(404);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});
