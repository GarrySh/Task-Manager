export default (router, { buildFormObj, logger }) => {
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
      ctx.render('tasks', { tasks, f: buildFormObj(), pageTitle: 'list all tasks' });
      logger('find all tasks');
    })
    .get('tasks1', '/tasks1', async (ctx) => {
      // const tasks = await Task.findAll();
      ctx.render('tasks/index1', { tasks, f: buildFormObj(), pageTitle: 'list all tasks' });
      logger('find all tasks');
    });
};

