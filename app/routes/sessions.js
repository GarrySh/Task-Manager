export default (router, {
  buildFormObj,
  encrypt,
  User,
  logger,
}) => {
  router
    .get('newSession', '/sessions/new', (ctx) => {
      ctx.render('sessions/new', { f: buildFormObj() });
    })
    .post('sessions', '/sessions', async (ctx) => {
      const { form } = ctx.request.body;
      if (form === undefined) {
        logger('unsuccessful authorization, form is missing');
        ctx.redirect(router.url('root'));
        return;
      }
      const { email, password } = ctx.request.body.form;
      const user = await User.findOne({
        where: { email },
      });
      if (user && user.passwordDigest === encrypt(password)) {
        ctx.session.userId = user.id;
        ctx.session.userEmail = user.email;
        logger(`user ID=${user.id} successfully logged in`);
        ctx.redirect(router.url('root'));
        return;
      }
      logger(`user ID=${user.id} email or password were wrong`);
      ctx.flash.set('email or password were wrong');
      ctx.render('sessions/new', { f: buildFormObj({ email }) });
    })
    .del('sessions', '/sessions', (ctx) => {
      logger(`user ID=${ctx.session.userId} successfully logged out`);
      ctx.session = {};
      ctx.redirect(router.url('root'));
    });
};
