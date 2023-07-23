require('dotenv').config();
import { Request, Response } from 'express';
import User from '../../schemas/user';

class Edit {
  async update(request: Request, response: Response) {

    try {
      const { email, token, newEmail, nick, name, surname } = request.body;

      const user = await User.findOne({ email }).select('+handleSignToken email VerifiedToken');

      const verifyEmail = await User.findOne({ email });
      const verifyNick = await User.findOne({ nick });


      if (newEmail !== null && newEmail !== verifyEmail.email && verifyEmail !== null) {
        return response.status(400).json({
          error: 'E-mail já em uso',
        });
      };

      if (verifyNick !== null && nick !== verifyNick.nick) {
        return response.status(400).json({
          error: 'Nome de usuário em uso',
        });
      };

      if (!user) {
        return response.status(400).json({ error: 'Usuário não encontrado' });
      } else if (user.isActive !== true) {
        return response.status(400).json({
          error: 'usuário desativado'
        });
      };

      if (token !== user.handleSignToken) {
        return response.status(400).json({ error: 'Usuário não conectado corretamente' });
      };

      if (nick.length < 3) {
        return response.status(400).json({
          error: 'Nickname com formato incorreto'
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

      if (email.length < 3) {
        return response.status(400).json({
          error: 'E-mail com formato incorreto'
        });
      };

      if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return response.status(400).json({
          error: 'E-mail com formato incorreto'
        });
      };


      await User.findByIdAndUpdate({ _id: user.id }, {
        '$set': {
          nick,
          emailVerified: true,
          email: newEmail !== null ? newEmail : user.email,
          name,
          surname,
        }
      });

      return response.json({
        message: 'Seu perfil foi atualizado'
      });

    } catch (err) {
      return response.status(404).json({
        error: err.message
      })
    }
  }
};

export default new Edit;