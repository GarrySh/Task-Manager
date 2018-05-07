export default (router, { logger }) => {
  router
    .get('root', '/', (ctx) => {
      ctx.render('welcome/index', {
        pageTitle: 'Welcome page',
      });
      console.log(ctx.session);
      logger(`main page rendered, sessions param: userID=${ctx.session.userId}`);
    });
};
