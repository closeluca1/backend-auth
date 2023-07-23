require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
const authConfig: any = process.env.SECRET;


declare global {
  namespace Express {
    interface Request {
      userId?: Record<string, any>
    }
  }
};

module.exports = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: 'Autorização não informada'
    });
  };

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return response.status(401).json({
      error: 'Erro na autorização'
    });
  };

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({
      error: 'Autorização inválida'
    });
  };

  jwt.verify(token, authConfig, (error, decoded) => {
    if (error) {
      return response.status(401).json({
        error: 'Autorização negada'
      });
    };
    request.userId = decoded.id;

    return next();
  });

};