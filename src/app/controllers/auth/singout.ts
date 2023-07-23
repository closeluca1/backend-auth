require('dotenv').config();
import { Request, Response } from 'express';
import User from '../../schemas/user';

class Disconect {
  async update(request: Request, response: Response) {

    try {
      const email = request.params.email;
      const token = request.params.token;

      const user = await User.findOne({ email }).select('+ handleSignToken');


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

      await User.findByIdAndUpdate({ _id: user.id }, {
        '$set': {
          handleSignToken: null
        }
      });

      // console.log(user);
      return response.status(200).json({
        message: 'Usuário desconectado',
      });

    } catch (err) {
      return response.status(404).json({
        error: err.message
      })
    }
  }
};

export default new Disconect;