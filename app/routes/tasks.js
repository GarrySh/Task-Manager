export default (router, {
  buildFormObj,
  Task,
  Status,
  logger,
}) => {
  router
    .get('tasks', '/tasks', async (ctx) => {
      const tasks = await Task.findAll();
      ctx.render('tasks', { tasks, f: buildFormObj(), pageTitle: 'list all tasks' });
      logger('display page: list all tasks');
    })
    .post('tasks', '/tasks', async (ctx) => {
      const { form } = ctx.request.body;
      console.log(form);
      // const user = User.build({ ...form, state: 'active' });
      // try {
      //   await user.save();
      //   ctx.flash.set('User has been created');
      //   ctx.redirect(router.url('root'));
      //   logger(`user id=${user.id} successfully created`);
      // } catch (err) {
      //   ctx.render('users/new', { f: buildFormObj(user, err), pageTitle: 'add new user' });
      //   logger(`user has not been created, error: ${err}`);
      // }
    })
    .get('task.new', '/tasks/new', async (ctx) => {
      const statuses = await Status.findAll();
      // console.log('statuses', statuses.map(i => i.name));
      const task = Task.build();
      ctx.render('tasks/new', { data: statuses, f: buildFormObj(task), pageTitle: 'create new task' });
      logger('display page: new task form');
    });
};

