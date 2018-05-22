export default (router, {
  buildFormObj,
  encrypt,
  User,
  logger,
}) => {
  router
    .get('session.new', '/sessions/new', (ctx) => {
      ctx.render('sessions/new', { f: buildFormObj() });
    })
    .post('session', '/sessions', async (ctx) => {
      try {
        const { email, password } = ctx.request.body.form;
        const passwordDigest = encrypt(password);
        const user = await User.findOne({
          where: { email, passwordDigest, state: 'active' },
        });
        ctx.session.userId = user.id;
        ctx.flash.set('successfully sign in');
        ctx.redirect(router.url('root'));
        logger(`user ID=${user.id} successfully logged in`);
      } catch (err) {
        await ctx.flash.set('email or password were wrong');

        ctx.redirect(router.url('session.new'));
        ctx.status = 401;
        logger(`unsuccessfully authentication ${err}`);
      }
    })
    .del('session', '/sessions', (ctx) => {
      logger(`user ID=${ctx.session.userId} successfully logged out`);
      ctx.session = {};
      ctx.flash.set('successfully sign out');
      ctx.redirect(router.url('root'));
    });
};
