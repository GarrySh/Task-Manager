import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import koaLogger from 'koa-logger';
import koaServe from 'koa-static';
import koaBodyparser from 'koa-bodyparser';
import koaWebpack from 'koa-webpack';

import addRoutes from './routes';
import container from './container';
import errorHandler from './middlewares/errorHandler';
import getWebpackConfig from '../webpack.config.babel';

export default () => {
  const app = new Koa();

  app.use(koaLogger());
  app.use(koaServe(path.join(__dirname, 'public')));
  app.use(koaBodyparser());

  if (process.env.NODE_ENV === 'development') {
    app.use(koaWebpack({
      config: getWebpackConfig(),
    }));
  }
  console.log(`current env ${process.env.NODE_ENV}`);

  const router = new Router();
  addRoutes(router, container);
  app.use(router.routes());
  app.use(router.allowedMethods());

  const pug = new Pug({
    viewPath: path.join(__dirname, 'views'),
    basedir: path.join(__dirname, 'views'),
    noCache: process.env.NODE_ENV === 'development',
    debug: process.env.NODE_ENV === 'development',
    helperPath: [
      { urlFor: (...args) => router.url(...args) },
    ],
  });
  pug.use(app);

  app.use(errorHandler());

  return app;
};
