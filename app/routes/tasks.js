export default (router, {
  buildFormObj, User, Task, Status, Tag, logger,
}) => {
  const updateTags = (tags, task) => {
    if (tags.length > 0) {
      return Promise.all(tags.map(tag =>
        Tag.findOne({ where: { name: tag } }).then((result) => {
          if (result) {
            return task.addTag(result);
          }
          return task.createTag({ name: tag });
        })));
    }
    return null;
  };

  router
    .get('tasks.list', '/tasks', async (ctx) => {
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
        const tags = form.Tags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0);
        await task.save();
        await updateTags(tags, task);
        ctx.flash.set('Task has been created');
        ctx.redirect(router.url('tasks.list'));
        logger(`task id=${task.id} successfully created`);
      } catch (err) {
        const statuses = await Status.findAll();
        const users = await User.findAll({ where: { state: 'active' } });
        ctx.flash.set('Task has not been created', true);
        ctx.render('tasks/new', {
          statuses, users, f: buildFormObj(task, err), pageTitle: 'create New task',
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
    })
    .get('task.edit', '/tasks/:taskId/edit', async (ctx) => {
      const statuses = await Status.findAll();
      const users = await User.findAll({ where: { state: 'active' } });
      const task = await Task.findOne({
        where: { id: ctx.params.taskId },
        include: [
          { model: Tag },
        ],
      });
      ctx.render('tasks/edit', {
        statuses, users, f: buildFormObj(task), pageTitle: 'edit task',
      });
    });
};

