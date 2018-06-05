export default (router, { buildFormObj, Task, logger }) => {
  // const tasks = [
  //   {
  //     id: 1,
  //     status: 'new',
  //     name: 'test task',
  //     description: 'test task for production server',
  //     tags: 'new, production',
  //     creator: 'Master',
  //     assignedTo: 'Foma',
  //   },
  //   {
  //     id: 2,
  //     status: 'new',
  //     name: 'test task',
  //     description: 'test task for production server',
  //     tags: 'main, inflow',
  //     creator: 'Lame',
  //     assignedTo: 'Anton',
  //   },
  //   {
  //     id: 3,
  //     status: 'new',
  //     name: 'drink beer',
  //     description: 'realy?',
  //     tags: 'bottle, beer',
  //     creator: 'Master',
  //     assignedTo: 'Garry',
  //   },
  // ];
  router
    .get('tasks', '/tasks', async (ctx) => {
      const tasks = await Task.findAll();
      ctx.render('tasks', { tasks, f: buildFormObj(), pageTitle: 'list all tasks' });
      logger('display page: list all tasks');
    })
    .get('task.new', '/tasks/new', (ctx) => {
      const task = Task.build();
      ctx.render('tasks/new', { f: buildFormObj(task), pageTitle: 'create new task' });
      logger('display page: new task form');
    });
};

