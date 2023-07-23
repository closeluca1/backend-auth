require('dotenv').config();
const route = require('express').Router();
import { router, mid } from './library';

//auth
route.post('/register', router.register.create);
route.post('/login', router.login.read);
route.get('/disconnect/:email/:token', mid.auth_middleware, router.sing_out.update);

// user
route.get('/user/perfil/:id/:token', mid.auth_middleware, router.perfil.show);
route.put('/user/perfil/edit', mid.auth_middleware, router.perfil_information.update);

route.get('/', function (req, res) {
  res.sendFile('./resources/status.html', { root: __dirname });
});



module.exports = route;