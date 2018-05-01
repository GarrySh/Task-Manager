import Rollbar from 'rollbar';

const rollbar = new Rollbar(process.env.ROLLBAR_ACCESS_TOKEN || '');

export default () => async (ctx, next) => {
  console.log(this);
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);

    rollbar.error(err);
    console.error(`trabl odnako ${ctx.body}`);
    throw new Error(`Error on Koa ${err}`);
  }
};
