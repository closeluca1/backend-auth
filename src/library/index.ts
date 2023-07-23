// middleware
import auth_middleware = require('../app/middlewares/auth');

export const mid = {
  auth_middleware
};

// auth
import register from '../app/controllers/auth/register';
import login from '../app/controllers/auth/login';
import sing_out from '../app/controllers/auth/singout';

// user
import perfil from '../app/controllers/user/show';
import perfil_information from '../app/controllers/user/edit';

export const router = {
  register,
  login,
  sing_out,
  perfil,
  perfil_information
};