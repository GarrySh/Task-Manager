import request from 'supertest';
import agent from 'jest-supertest-cookie-fix';
import faker from 'faker';
import app from '../app';
import container from '../app/container';

const { User } = container;
let server;

beforeAll(async () => {
  await User.sync({ force: true });
});

beforeEach(() => {
  server = app().listen();
});

afterEach((done) => {
  server.close();
  done();
});

describe('page availability tests', () => {
  test('GET 200 /', async () => {
    await request.agent(server)
      .get('/')
      .expect(200);
  });

  test('GET 200 /users', async () => {
    await request.agent(server)
      .get('/users')
      .expect(200);
  });

  test('GET 200 /users/new', async () => {
    await request.agent(server)
      .get('/users/new')
      .expect(200);
  });

  test('GET 200 /sessions/new', async () => {
    await request.agent(server)
      .get('/sessions/new')
      .expect(200);
  });

  test('GET 200 /tasks', async () => {
    await request.agent(server)
      .get('/tasks')
      .expect(200);
  });

  test('GET 404 undefined page', async () => {
    await request.agent(server)
      .get('/undefined')
      .expect(404);
  });
});

describe('users CRUD tests', () => {
  let user;
  let session;

  beforeEach(async () => {
    user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    session = agent(server);

    await session
      .post('/users')
      .send({ form: user })
      .expect(302);

    await session
      .post('/sessions')
      .send({ form: { email: user.email, password: user.password } })
      .expect(302);
  });

  afterAll(async () => {
    // const users = await User.findAll();
    // console.log(users);
  });

  test('sign up', async () => {
    const usersPage = await session
      .get('/users')
      .expect(200);

    expect(usersPage.text).toMatch(user.firstName);
    expect(usersPage.text).toMatch(user.lastName);
    expect(usersPage.text).toMatch(user.email);
  });

  test('sign in', async () => {
    const rootPage = await session
      .get('/')
      .expect(200);

    expect(rootPage.text).toMatch('Settings');
    expect(rootPage.text).toMatch('Sign out');
  });

  test('sign out', async () => {
    await session
      .delete('/sessions')
      .expect(302);

    const rootPage = await session
      .get('/')
      .expect(200);

    expect(rootPage.text).toMatch('Sign in');
    expect(rootPage.text).toMatch('Sign up');
  });

  test('update user', async () => {
    await session
      .delete('/sessions')
      .expect(302);

    const rootPage = await session
      .get('/')
      .expect(200);

    expect(rootPage.text).toMatch('Sign in');
    expect(rootPage.text).toMatch('Sign up');
  });
});
