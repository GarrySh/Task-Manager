export default (router, { Status, buildFormObj, logger }) => {
  router
    .get('statuses', '/statuses', async (ctx) => {
      const statuses = await Status.findAll();
      ctx.render('statuses', { statuses, f: buildFormObj(), pageTitle: 'modify task statuses' });
      logger('display page: list all task statuses');
    })
    .post('statuses', '/statuses', async (ctx) => {
      const { form } = ctx.request.body;
      const status = Status.build(form);
      try {
        await status.save();
        ctx.flash.set('New status added');
        ctx.redirect(router.url('statuses'));
        logger(`new status ${status.name} has been created`);
      } catch (err) {
        const statuses = await Status.findAll();
        ctx.render('statuses', { statuses, f: buildFormObj(status, err), pageTitle: 'modify task statuses' });
        logger(`status has not been created, error: ${err}`);
      }
    });
};

