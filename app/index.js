import path from 'path';
import dotenv from 'dotenv';
import Rollbar from 'rollbar';
import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import serve from 'koa-static';
import Pug from 'koa-pug';

dotenv.config();
const rollbar = new Rollbar(process.env.ROLLBAR_ACCESS_TOKEN || '');

export default () => {
  const app = new Koa();
  const router = new Router();

  app.use(logger());
  app.use(serve(path.join(__dirname, '..', 'public')));

  router
    .get('/', (ctx) => {
      ctx.render('index');
    })
    .get('*', (ctx) => {
      rollbar.error(`page ${ctx.href} not found`);
    });

  const pug = new Pug({
    viewPath: path.join(__dirname, '..', 'views'),
    basedir: path.join(__dirname, '..', 'views'),
    debug: true,
  });
  pug.use(app);

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      rollbar.error(err);
      throw new Error(`Error on Koa ${err}`);
    }
  });

  return app;
};
