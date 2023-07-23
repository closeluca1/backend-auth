require('dotenv').config();
import { Request, Response } from 'express';
import User from '../../schemas/user';
import jwt = require('jsonwebtoken');

const authConfig = process.env.SECRET;

function generateToken(params = {}) {
  return jwt.sign(params, authConfig, {
    expiresIn: 10000,
  });
};

class Register {
  async create(request: Request, response: Response) {
    try {
      const { name, surname, nick, email, password, termscontract } = request.body;

      const verifyEmail = await User.findOne({ email });
      const verifyNick = await User.findOne({ nick });

      if (verifyEmail) {
        return response.status(400).json({
          error: 'Usuário já existente',
        });
      };

      if (verifyNick) {
        return response.status(400).json({
          error: 'Nome de usuário em uso',
        });
      };

      if (!nick.match(/^[a-zA-Z0-9,_,.,]+$/)) {
        return response.status(400).json({
          error: 'Nickname com formato incorreto'
        });
      };

      if (name.length < 3) {
        return response.status(400).json({
          error: 'Nome com formato incorreto'
        });
      };

      if (surname.length < 3) {
        return response.status(400).json({
          error: 'Sobrenome com formato incorreto'
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

      if (termscontract !== true) {
        return response.status(400).json({
          error: 'Necessário aceitar os termos de usuário'
        });
      };

      const user = await User.create({
        name,
        surname,
        nick,
        email,
        password,
        termscontract,
        createdAt: new Date().toLocaleString([], { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });



      return response.json({
        message: 'Sua conta foi criada',
        token: generateToken({ id: user._id })
      });



    } catch (err) {
      return response.status(404).json({
        error: err.message
      });
    };
  }
};

export default new Register;