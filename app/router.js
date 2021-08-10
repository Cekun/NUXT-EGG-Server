'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const jwt = app.middleware.jwt({app})

  router.get('/', controller.home.index);
  router.get('/captcha', controller.util.captcha);
  router.get('/sendCode', controller.util.sendCode);
  router.post('/uploadfile', controller.util.uploadfile);
  router.post('/mergefile', controller.util.mergefile)
  router.post('/mergefile', controller.util.mergefile)

  router.group({name: 'user', prefix: '/user'}, router => {
    const { info, register, login, verify} = controller.user

    router.post('/register', register)
    router.post('/login', login)
    router.get('/info', jwt, info)
    router.get('/verify', verify)
  })


};
