const users = [
  { id: 0, userName: 'admin' },
  { id: 1, userName: 'garry' },
];

export default (router) => {
  router
  // .post('users', '/users', (ctx) => {
  //   users.push({
  //     id: users.length,
  //     userName: ctx.request.body.userName || '',
  //   });
  //   ctx.redirect(router.url('root'));
  // });
    .get('users', '/users', (ctx) => {
      ctx.render('users', { users });
    });
};
