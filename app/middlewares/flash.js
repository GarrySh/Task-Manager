import debug from 'debug';

const log = debug('flash_middleware');

export default () => (ctx, next) => {
  if (ctx.session === undefined) {
    log('critical, no ctx.session found');
    throw new Error('flash middleware requires the koa-session');
  }

  const prev = ctx.session.flash;

  if (prev) {
    ctx.session.flash = null;
  }

  ctx.flash = Object.seal({
    get: () => prev,
    set: (data, now) => {
      if (now) {
        ctx.flash.nowMessage = data;
        log('successfully set nowMessage ', data);
      } else {
        ctx.session.flash = data;
        log('successfully set flash message ', data);
      }
    },
    nowMessage: null,
  });

  return next();
};
