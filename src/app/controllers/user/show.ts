require('dotenv').config();
import { Request, Response } from 'express';
import User from '../../schemas/user';

class Show {
  async show(request: Request, response: Response) {
    try {

      const user = await User.findById(request.params.id).select('+handleSignToken');
      const token = request.params.token;


      if (!user) {
        return response.status(400).json({ error: 'Usuário não encontrado' });
      } else if (user.isActive !== true) {
        return response.status(400).json({
          error: 'usuário desativado'
        });
      };

      if (token !== user.handleSignToken) {
        return response.status(400).json({ error: 'Usuário não autenticado corretamente' });
      };

      return response.send({
        user: {
          nick: user.nick,
          name: user.name,
          surname: user.surname,
          email: user.email,
        },
      });


    } catch (err) {
      return response.status(404).json({
        error: err.message
      });
    };
  };
};

export default new Show;