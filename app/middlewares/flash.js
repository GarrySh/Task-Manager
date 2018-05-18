import debug from 'debug';

const log = debug('flash_middleware');

export default () => (ctx, next) => {
  if (ctx.session === undefined) {
    log('critical, no ctx.session found');
    throw new Error('flash requires the koa-session middleware');
  }

  const prev = ctx.session.flash;

  if (prev) {
    log('flash message found %j', prev);
    // ctx.session[key] = null
  } else {
    log('No flash message found');
  }

  ctx.flash = Object.seal({
    get() {
      const current = prev;
      ctx.session.flash = null;
      log('successfully get flash message ', current);
      return current;
    },
    set(data) {
      ctx.session.flash = data;
      log('successfully set flash message ', data);
    },
  });

  return next();
};
