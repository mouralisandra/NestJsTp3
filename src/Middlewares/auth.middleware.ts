import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['auth-user']; 
    next();
    if (token) {
      try {
        const decoded = verify(token, 'your-secret-key'); 
        req['userId'] = decoded['userId']; 
        next();
      } catch (err) {
        res.json({ message: 'Token invalide' }); 
      }
    } else {
      res.json({ message: 'Accès non autorisé' }); 
    }
  }
}