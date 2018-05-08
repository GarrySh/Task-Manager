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
