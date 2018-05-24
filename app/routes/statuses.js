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
        if (!ctx.state.isSignedIn()) {
          ctx.status = 403;
          logger('unregistered user tried to edit task status');
          return;
        }
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
        logger('display page: status edit form');
      } catch (err) {
        ctx.flash.set('error edit task status');
        ctx.status = 500;
        ctx.render('welcome/index');
        logger(`error edit status, ${err}`);
      }
    })
    .patch('status.update', '/statuses/:statusId', async (ctx) => {
      let status;
      try {
        status = await Status.findOne({
          where: { id: ctx.params.statusId },
        });
        const { form } = ctx.request.body;
        await status.update(form);
        ctx.flash.set('Task status successfully updated');
        ctx.redirect(router.url('statuses'));
        logger('Task status successfully updated');
      } catch (err) {
        ctx.status = 400;
        if (status !== null) {
          ctx.render('statuses/edit', { f: buildFormObj(status, err), pageTitle: 'edit status settings' });
        }
        logger(`user has not been updated, error ${err}`);
      }
    })
    .del('status.delete', '/statuses/:statusId', async (ctx) => {
      try {
        const status = await Status.findOne({
          where: { id: ctx.params.statusId },
        });
        await status.destroy();
        ctx.flash.set('Status successfully deleted');
        ctx.redirect(router.url('statuses'));
        logger('Status successfully deleted');
      } catch (err) {
        ctx.status = 400;
        logger(`status has not been deleted, error ${err}`);
      }
    });
};

