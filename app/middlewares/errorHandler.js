import Rollbar from 'rollbar';

const rollbar = new Rollbar(process.env.ROLLBAR_ACCESS_TOKEN || '');

export default () => async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.status || 500;
    rollbar.error(err);
  }
};
