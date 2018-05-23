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
    })
    .get('status.edit', '/statuses/:statusId/edit', async (ctx) => {
      try {
        if (!ctx.state.isSignedIn()) {
          ctx.status = 403;
          logger('unregistered user tried to edit task status');
          return;
        }
        const status = await Status.findOne({
          where: { id: ctx.params.statusId },
        });
        ctx.render('statuses/edit', { f: buildFormObj(status), pageTitle: 'edit task status' });
        logger('display page: user edit form');
      } catch (err) {
        ctx.flash.set('error edit task status');
        ctx.status = 500;
        ctx.render('welcome/index');
        logger(`error edit status, ${err}`);
      }
    });
};

