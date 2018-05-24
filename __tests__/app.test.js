import request from 'supertest';
import agent from 'jest-supertest-cookie-fix';
import faker from 'faker';
import app from '../app';
import container from '../app/container';

const { User, Status } = container;
let server;
let user;

beforeEach(async () => {
  server = app().listen();

  await User.sync({ force: true });
  await Status.sync({ force: true });

  user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await request.agent(server)
    .post('/users')
    .send({ form: user })
    .expect(302);
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

  test('GET 200 /statuses', async () => {
    await request.agent(server)
      .get('/statuses')
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
  let session;
  const emailToUpdate = faker.internet.email();

  beforeEach(async () => {
    session = agent(server);

    await session
      .post('/sessions')
      .send({ form: { email: user.email, password: user.password } })
      .expect(302);
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
      .del('/sessions')
      .expect(302);

    const rootPage = await session
      .get('/')
      .expect(200);

    expect(rootPage.text).toMatch('Sign in');
    expect(rootPage.text).toMatch('Sign up');
  });

  test('update user', async () => {
    await session
      .patch('/users/1')
      .send({ form: { email: emailToUpdate } })
      .expect(302);

    const usersPage = await session
      .get('/users')
      .expect(200);

    expect(usersPage.text).toMatch(emailToUpdate);
  });

  test('delete user', async () => {
    await session
      .del('/users/1')
      .expect(302);

    const usersPage = await session
      .get('/users')
      .expect(200);

    expect(usersPage.text).not.toMatch(user.email);
  });
});

describe('users CRUD without authentication', () => {
  const emailToNotUpdate = faker.internet.email();
  const userWithIncorrectCreditals = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  test('sign in with incorrect credentials', async () => {
    await request.agent(server)
      .post('/sessions')
      .send({ form: userWithIncorrectCreditals })
      .expect(401);

    const rootPage = await request.agent(server)
      .get('/')
      .expect(200);

    expect(rootPage.text).toMatch('Sign in');
    expect(rootPage.text).toMatch('Sign up');
  });

  test('update user', async () => {
    await request.agent(server)
      .patch('/users/1')
      .send({ form: { email: emailToNotUpdate } })
      .expect(400);

    const usersPage = await request.agent(server)
      .get('/users')
      .expect(200);

    expect(usersPage.text).toMatch(user.email);
    expect(usersPage.text).not.toMatch(emailToNotUpdate);
  });

  test('delete user', async () => {
    await request.agent(server)
      .del('/users/1')
      .expect(400);

    const usersPage = await request.agent(server)
      .get('/users')
      .expect(200);

    expect(usersPage.text).toMatch(user.email);
  });
});

describe('task status CRUD tests without authentication', () => {

});
