import _ from 'lodash';

export default (router, {
  buildFormObj, User, Task, Status, Tag, logger,
}) => {
  const addTags = (tags, task) => {
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

  const removeTagsFromTask = (tags, task) => {
    if (tags.length > 0) {
      return Promise.all(tags.map(tag =>
        Tag.findOne({ where: { name: tag } }).then(result => task.removeTag(result))));
    }
    return null;
  };

  const checkTags = async (tags, task) => {
    const currentTags = task.Tags.map(tag => tag.name);
    const tagsToRemove = _.difference(currentTags, tags);
    const tagsToAdd = _.difference(tags, currentTags);
    await addTags(tagsToAdd, task);
    await removeTagsFromTask(tagsToRemove, task);
  };

  const getTagsFromForm = form =>
    form.Tags.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0);

  router
    .get('task.list', '/tasks', async (ctx) => {
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
    .post('task', '/tasks', async (ctx) => {
      const { form } = ctx.request.body;
      const task = Task.build({ ...form, creatorId: ctx.session.userId });
      try {
        const tags = getTagsFromForm(form);
        await task.save();
        await addTags(tags, task);
        ctx.flash.set('Task has been created');
        ctx.redirect(router.url('task.list'));
        logger(`task id=${task.id} successfully created`);
      } catch (err) {
        const statuses = await Status.findAll();
        const users = await User.findAll();
        ctx.flash.set('Task has not been created', true);
        ctx.render('tasks/new', {
          statuses, users, f: buildFormObj(task, err), pageTitle: 'create New task',
        });
        logger(`task has not been created, error: ${err}`);
      }
    })
    .get('task.new', '/tasks/new', async (ctx) => {
      const statuses = await Status.findAll();
      const users = await User.findAll();
      const task = Task.build();
      ctx.render('tasks/new', {
        statuses, users, f: buildFormObj(task), pageTitle: 'create new task',
      });
      logger('display page: new task form');
    })
    .get('task.edit', '/tasks/:taskId/edit', async (ctx) => {
      const statuses = await Status.findAll();
      const users = await User.findAll();
      const task = await Task.findOne({
        where: { id: ctx.params.taskId },
        include: [
          { model: Tag },
        ],
      });
      ctx.render('tasks/edit', {
        statuses, users, f: buildFormObj(task), pageTitle: 'edit task',
      });
    })
    .patch('task.update', '/tasks/:taskId', async (ctx) => {
      let task;
      const { form } = ctx.request.body;
      const tags = getTagsFromForm(form);
      try {
        task = await Task.findOne({
          where: { id: ctx.params.taskId },
          include: [
            { model: Tag },
          ],
        });
        await checkTags(tags, task);
        await task.update(form);
        ctx.flash.set('Task successfully updated');
        ctx.redirect(router.url('task.list'));
        logger('task successfully updated');
      } catch (err) {
        console.log(err);
      }
    });
};

