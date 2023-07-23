require('dotenv').config();
import { Request, Response } from 'express';
import User from '../../schemas/user';
import * as bcrypt from 'bcrypt';
import jwt = require('jsonwebtoken');

const authConfig = process.env.SECRET;

function generateToken(params = {}) {
  return jwt.sign(params, authConfig, {
    // expiresIn: 86400,
  });
};


class Login {
  async read(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return response.status(400).json({ error: 'Usuário não encontrado' });
      } else if (user.isActive !== true) {
        return response.status(400).json({
          error: 'usuário desativado'
        });
      };

      if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return response.status(400).json({
          error: 'E-mail com formato incorreto'
        });
      };

      if (password.length < 7) {
        return response.status(400).json({
          error: 'A senha precisa conter 8 caracteres'
        });
      };
      
      if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])[@!#$%^&*()/\\a-zA-Z0-9]{8,}/)) {
        return response.status(400).json({
          error: 'A senha deve conter uma letra maiúscula'
        });
      };

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return response.status(400).json({ error: 'E-mail e/ou senha inválidos' });
      };

      user.password = undefined;

      await User.findByIdAndUpdate({ _id: user.id }, {
        '$set': {
          handleSignToken: generateToken({ id: user.id })
        }
      });
      // const setSingToken = async () => {
      // };

      return response.json({
        user,
        token: generateToken({ id: user.id }),
        // handleSignToken: setSingToken()
      });

    } catch (err) {
      return response.status(404).json({
        error: 'Usuário não encontrado'
      });
    };
  };
};

export default new Login;