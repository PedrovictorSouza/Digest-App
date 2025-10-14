import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Não autorizado. Faça login primeiro.' });
  }
  next();
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  next();
};

