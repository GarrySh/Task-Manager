export default (router, { buildFormObj, User, logger }) => {
  router
    .get('users', '/users', async (ctx) => {
      const users = await User.findAll();
      logger('find users');
      ctx.render('users', { users });
    })
    .get('newUser', '/users/new', (ctx) => {
      const user = User.build();
      logger('new user form rendered');
      ctx.render('users/new', { f: buildFormObj(user) });
    })
    .post('users', '/users', async (ctx) => {
      const { form } = ctx.request.body;
      const user = User.build(form);
      try {
        await user.save();
        logger(`user ${user.id} has been created`);

        ctx.flash.set('sd');
        console.log('session', ctx.session);
        // console.log('flash', flash);
        // ctx.flashMessage.warning = 'User1 has been created';
        // console.log('session1', ctx.session);
        // const flash1 = ctx.flashMessage.warning;
        // console.log('flash1', flash1);

        // ctx.flashMessage.warning = 'User2 has been created';
        // console.log('session2', ctx.session);

        ctx.redirect(router.url('root'));
      } catch (err) {
        logger(`user has not been created, error: ${err}`);
        ctx.render('users/new', { f: buildFormObj(user, err) });
      }
    });
};
