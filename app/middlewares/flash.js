class FlashMessage1 {
  constructor(ctx) {
    console.log(ctx.session)
    // this.session = ctx.session;
    // this.flashMessage = ctx.session && ctx.session.flashMessage.get();
    // if (!this.flashMessage) {
    //   this.flashMessage = '';
    // }
  }

  set(msg) {
    this.flashMessage = msg;
  }

  get() {
    const msg = this.flashMessage;
    delete this.flashMessage;
    return msg;
  }
}

export default () => (ctx, next) => {
  console.log('state', ctx.state);
  console.log('session', ctx.session);
  const flashMessage = new FlashMessage1(ctx);
  if (!ctx.state) {
    ctx.state = {};
  }
  ctx.state.flash = flashMessage;
  ctx.flash = flashMessage;
  return next();
};
