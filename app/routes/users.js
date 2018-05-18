export default (router, { buildFormObj, User, logger }) => {
  router
    .get('users', '/users', async (ctx) => {
      const users = await User.findAll();
      ctx.render('users', { users, pageTitle: 'list all users' });
      logger('find users');
    })
    .post('users', '/users', async (ctx) => {
      const { form } = ctx.request.body;
      const user = User.build(form);
      try {
        await user.save();
        ctx.flash.set('User has been created');
        ctx.redirect(router.url('root'));
        logger(`user id=${user.id} successfully created`);
      } catch (err) {
        ctx.render('users/new', { f: buildFormObj(user, err), pageTitle: 'add new user' });
        logger(`user has not been created, error: ${err}`);
      }
    })
    .get('user.new', '/users/new', (ctx) => {
      const user = User.build();
      ctx.render('users/new', { f: buildFormObj(user), pageTitle: 'add new user' });
      logger('new user form rendered');
    })
    .get('user.edit', '/users/:userId/edit', async (ctx) => {
      const { firstName, lastName, email } = await User.findOne({
        where: { id: ctx.session.userId },
      });
      ctx.render('users/edit', { f: buildFormObj({ firstName, lastName, email }), pageTitle: 'edit user settings' });
      logger('user edit form rendered');
    })
    .del('user.delete', '/users/:userId', async (ctx) => {
      try {
        const user = await User.findOne({
          where: { id: ctx.session.userId },
        });
        await user.destroy();
        ctx.session = {};
        ctx.flash.set('User successfully deleted');
        ctx.redirect(router.url('root'));
        logger('user successfully deleted');
      } catch (err) {
        ctx.flash.set('user has not been deleted');
        logger(`user has not been deleted, error ${err}`);
      }
    })
    .patch('user.update', '/users/:userId', async (ctx) => {
      let user;
      try {
        user = await User.findOne({
          where: { id: ctx.session.userId },
        });
        const { form } = ctx.request.body;
        await user.update(form);
        ctx.flash.set('User successfully updated');
        ctx.redirect(router.url('root'));
        logger('user successfully updated');
      } catch (err) {
        ctx.render('users/edit', { f: buildFormObj(user, err), pageTitle: 'edit user settings' });
        logger(`user has not been updated, error ${err}`);
      }
    });
};
