import path from 'path';
import _ from 'lodash';
import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import koaLogger from 'koa-logger';
import koaServe from 'koa-static';
import koaBodyparser from 'koa-bodyparser';
import koaWebpack from 'koa-webpack';
import koaSession from 'koa-session';
import koaFlash from 'koa-flash-simple';
import koaMethodOverride from 'koa-methodoverride';

import addRoutes from './routes';
import container from './container';
import errorHandler from './middlewares/errorHandler';
import getWebpackConfig from '../webpack.config.babel';

export default () => {
  container.logger('creating server');
  container.logger(`current env ${process.env.NODE_ENV}`);
  const app = new Koa();
  const router = new Router();

  app.keys = ['some secret for sessions'];
  app.use(koaLogger());
  app.use(koaSession(app));
  app.use(koaFlash());
  app.use(async (ctx, next) => {
    ctx.state = {
      flash: ctx.flash,
      isSignedIn: () => ctx.session.userId !== undefined,
    };
    await next();
  });

  if (process.env.NODE_ENV === 'development') {
    app.use(koaWebpack({
      config: getWebpackConfig(),
    }));
  }

  addRoutes(router, container);
  app.use(koaServe(path.join(__dirname, 'public')));
  app.use(koaBodyparser());
  app.use(koaMethodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      return req.body._method; // eslint-disable-line
    }
    return null;
  }));

  app.use(router.routes());
  app.use(router.allowedMethods({ throw: true }));


  const pug = new Pug({
    viewPath: path.join(__dirname, 'views'),
    basedir: path.join(__dirname, 'views'),
    noCache: process.env.NODE_ENV === 'development',
    debug: process.env.NODE_ENV === 'development',
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });
  pug.use(app);
  app.use(errorHandler());
  container.logger('server has been created');

  return app;
};
