import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import app from '../app';

describe('Simple tests', () => {
  let server;

  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });

  beforeEach(() => {
    server = app().listen();
  });

  test('GET 200 /', async () => {
    const res = await request.agent(server)
      .get('/');
    expect(res).toHaveHTTPStatus(200);
  });

  test('GET 404 undefined page', async () => {
    const res = await request.agent(server)
      .get('/undefined');
    expect(res).toHaveHTTPStatus(404);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});

