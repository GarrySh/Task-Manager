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
    set: (message, now) => {
      if (now) {
        ctx.flash.nowMessage = message;
        log('successfully set nowMessage ', message);
      } else {
        ctx.session.flash = message;
        log('successfully set flash message ', message);
      }
    },
    nowMessage: null,
  });

  return next();
};
