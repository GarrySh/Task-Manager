export default (router, {
  buildFormObj, User, Task, Status, logger,
}) => {
  router
    .get('tasks', '/tasks', async (ctx) => {
      const tasks = await Task.findAll({
        include: [
          { model: User, as: 'creator' },
          { model: User, as: 'assignedTo' },
          { model: Status, as: 'status' },
        ],
      });
      ctx.render('tasks', { tasks, f: buildFormObj(), pageTitle: 'list all tasks' });
      logger('display page: list all tasks');
    })
    .post('tasks', '/tasks', async (ctx) => {
      const { form } = ctx.request.body;
      const tags = form.tags.split(',').map(item => item.trim());
      console.log(tags);
      const task = Task.build({ ...form, creatorId: ctx.session.userId });
      // const task = Task.build({ ...form });
      // const creator = User.findOne({
      //   where: { id: ctx.session.userId, state: 'active' },
      // });
      // task.hasOne(creator);
      // console.log(task);
      await task.save();
      ctx.redirect(router.url('tasks'));
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
      const users = await User.findAll(); // fix only active users
      const task = Task.build();
      ctx.render('tasks/new', {
        statuses, users, f: buildFormObj(task), pageTitle: 'create new task',
      });
      logger('display page: new task form');
    });
};

