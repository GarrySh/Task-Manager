export default (router, {
  buildFormObj, User, Task, Status, Tag, logger,
}) => {
  router
    .get('tasks', '/tasks', async (ctx) => {
      const tasks = await Task.findAll({
        include: [
          { model: User, as: 'creator' },
          { model: User, as: 'assignedTo' },
          { model: Status, as: 'status' },
          { model: Tag },
        ],
      });
      ctx.render('tasks', { tasks, f: buildFormObj(), pageTitle: 'list all tasks' });
      logger('display page: list all tasks');
    })
    .post('tasks', '/tasks', async (ctx) => {
      const { form } = ctx.request.body;
      const task = Task.build({ ...form, creatorId: ctx.session.userId });
      try {
        const tags = form.tags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0);
        if (tags.length > 0) {
          await Promise.all(tags.map(tag =>
            Tag.findOne({ where: { name: tag } }).then((result) => {
              if (result) {
                return task.addTag(result);
              }
              return task.createTag({ name: tag });
            })));
        }
        await task.save();
        ctx.flash.set('Task has been created');
        ctx.redirect(router.url('tasks'));
        logger(`task id=${task.id} successfully created`);
      } catch (err) {
        const statuses = await Status.findAll();
        const users = await User.findAll({ where: { state: 'active' } });
        ctx.flash.set('Task has not been created');
        ctx.render('tasks/new', {
          statuses, users, f: buildFormObj(task, err), pageTitle: 'create new task',
        });
        logger(`task has not been created, error: ${err}`);
      }
    })
    .get('task.new', '/tasks/new', async (ctx) => {
      const statuses = await Status.findAll();
      const users = await User.findAll({ where: { state: 'active' } });
      const task = Task.build();
      ctx.render('tasks/new', {
        statuses, users, f: buildFormObj(task), pageTitle: 'create new task',
      });
      logger('display page: new task form');
    });
};

