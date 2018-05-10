<<<<<<< HEAD
const tasks = [
  { id: 1, status: 'new', name: 'add new feature', description: 'description', tags: 'beer fest', creator: 'master', assignedTo: 'assigned' },
  { id: 2, status: 'new', name: 'clear bottle', description: 'description', tags: 'bottle', creator: 'lame', assignedTo: 'assigned' },
  { id: 3, status: 'new', name: 'change manager', description: 'on my way', tags: 'manager news', creator: 'master', assignedTo: 'assigned' },
];

export default (router, { logger }) => {
  router
    .get('tasks', '/tasks', async (ctx) => {
      // const users = await User.findAll();
      ctx.render('tasks', { tasks, pageTitle: 'list all tasks' });
      logger('render tasks list');
    });
};
=======
export default (router, { logger }) => {
  const tasks = [
    {
      id: 1,
      status: 'new',
      name: 'test task',
      description: 'test task for production server',
      tags: 'new, production',
      creator: 'Master',
      assignedTo: 'Foma',
    },
    {
      id: 2,
      status: 'new',
      name: 'test task',
      description: 'test task for production server',
      tags: 'main, inflow',
      creator: 'Lame',
      assignedTo: 'Anton',
    },
    {
      id: 3,
      status: 'new',
      name: 'drink beer',
      description: 'realy?',
      tags: 'bottle, beer',
      creator: 'Master',
      assignedTo: 'Garry',
    },
  ];
  router
    .get('tasks', '/tasks', async (ctx) => {
      // const tasks = await Task.findAll();
      ctx.render('tasks', { tasks, pageTitle: 'list all tasks' });
      logger('find all tasks');
    });
};

>>>>>>> ab40ab8d1d7bb30c9abca5ffaa4e8c41ae0ef53e
