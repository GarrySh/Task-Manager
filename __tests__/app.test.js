import request from 'supertest';
import agent from 'jest-supertest-cookie-fix';
import faker from 'faker';
import app from '../app';
import initDb from '../app/initDb';

let server;
let session;
let user;

beforeEach(async () => {
  server = app().listen();
  await initDb();
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

  session = agent(server);
  await session
    .post('/sessions')
    .send({ form: { email: user.email, password: user.password } })
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
    const emailToUpdate = faker.internet.email();

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

describe('task status CRUD', () => {
  let statusName;

  beforeEach(async () => {
    statusName = faker.random.word();

    await session
      .post('/statuses')
      .send({ form: { name: statusName } })
      .expect(302);
  });

  test('new status', async () => {
    const statusPage = await session
      .get('/statuses')
      .expect(200);

    expect(statusPage.text).toMatch(statusName);
  });

  test('delete status', async () => {
    await session
      .del('/statuses/1')
      .expect(302);

    const statusPage = await session
      .get('/statuses')
      .expect(200);

    expect(statusPage.text).not.toMatch(statusName);
  });

  test('update status', async () => {
    const newStatusName = faker.random.word();

    await session
      .patch('/statuses/1')
      .send({ form: { name: newStatusName } })
      .expect(302);

    const statusPage = await session
      .get('/statuses')
      .expect(200);

    expect(statusPage.text).toMatch(newStatusName);
    expect(statusPage.text).not.toMatch(statusName);
  });
});

describe('task CRUD', () => {
  let task;

  beforeEach(async () => {
    task = {
      name: faker.random.word(),
      description: faker.random.words(),
      statusId: 1,
      assignedToId: 1,
      tagsStr: faker.random.word(),
    };

    await session
      .post('/statuses')
      .send({ form: { name: faker.random.word() } })
      .expect(302);

    await session
      .post('/tasks')
      .send({ form: task })
      .expect(302);
  });

  test('add task', async () => {
    const tasksPage = await session
      .get('/tasks')
      .expect(200);

    expect(tasksPage.text).toMatch(task.name);
  });
});
