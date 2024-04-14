import { Request, Response, NextFunction } from 'express';

const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).send('Unauthorized');
}
  
const checkNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (req.isAuthenticated()) {
        res.send('Already logged In');
    }
    next();
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
}