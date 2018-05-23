export default (router, { buildFormObj, User, logger }) => {
  router
    .get('users', '/users', async (ctx) => {
      const users = await User.findAll({
        where: { state: 'active' },
      });
      ctx.render('users', { users, pageTitle: 'list all users' });
      logger('find users');
    })
    .post('users', '/users', async (ctx) => {
      const { form } = ctx.request.body;
      const user = User.build({ ...form, state: 'active' });
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
      logger('display page: new user form');
    })
    .get('user.display', '/users/:userId', async (ctx) => {
      try {
        const { firstName, lastName, email } = await User.findOne({
          where: { id: ctx.params.userId, state: 'active' },
        });
        ctx.render('users/display', { f: buildFormObj({ firstName, lastName, email }), pageTitle: 'show user' });
        logger('display page: user display form');
      } catch (err) {
        ctx.flash.set('user not found');
        ctx.status = 404;
        ctx.render('welcome/index');
        logger(`user id:${ctx.params.userId} not found, ${err}`);
      }
    })
    .get('user.edit', '/users/:userId/edit', async (ctx) => {
      try {
        if (Number(ctx.params.userId) !== ctx.session.userId) {
          ctx.flash.set('access denied');
          ctx.status = 403;
          ctx.render('welcome/index');
          logger(`user id:${ctx.session.userId} tried to edit user id:${ctx.params.userId}`);
          return;
        }
        const { firstName, lastName, email } = await User.findOne({
          where: { id: ctx.session.userId, state: 'active' },
        });
        ctx.render('users/edit', { f: buildFormObj({ firstName, lastName, email }), pageTitle: 'edit user settings' });
        logger('display page: user edit form');
      } catch (err) {
        ctx.flash.set('error edit user');
        ctx.status = 500;
        ctx.render('welcome/index');
        logger(`error edit user, ${err}`);
      }
    })
    .del('user.delete', '/users/:userId', async (ctx) => {
      try {
        const user = await User.findOne({
          where: { id: ctx.session.userId, state: 'active' },
        });
        await user.update({ state: 'inactive' });
        ctx.session = {};
        ctx.flash.set('User successfully deleted');
        ctx.redirect(router.url('root'));
        logger('user successfully deleted');
      } catch (err) {
        ctx.status = 400;
        logger(`user has not been deleted, error ${err}`);
      }
    })
    .patch('user.update', '/users/:userId', async (ctx) => {
      let user;
      try {
        user = await User.findOne({
          where: { id: ctx.session.userId, state: 'active' },
        });
        const { form } = ctx.request.body;
        const { password, ...restForm } = form;
        const newForm = password === '' ? restForm : form;
        await user.update(newForm);
        ctx.flash.set('User successfully updated');
        ctx.redirect(router.url('root'));
        logger('user successfully updated');
      } catch (err) {
        ctx.status = 400;
        if (user !== null) {
          ctx.render('users/edit', { f: buildFormObj(user, err), pageTitle: 'edit user settings' });
        }
        logger(`user has not been updated, error ${err}`);
      }
    });
};
