const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkAuthenticated, checkNotAuthenticated } = require('../utils/authenticationUtils');
const { registerUser } = require('../controllers/usersController');
const { createNewUserProfile } = require('../controllers/profileController');
const passport = require('passport');
const initializePassport = require('../../src/middleware/passport-config.ts');
const { validateForm } = require('../utils/validation.ts');
import { Request, Response, NextFunction } from 'express';
initializePassport(passport);

router.get('/checkHealth', (req: Request, res: Response) => {
  res.send('healthy');
});

router.get('/authenticateToken', checkAuthenticated, async (req: Request, res: Response) => {
    res.send('User authenticated');
});

router.post('/register', validateForm, checkNotAuthenticated, async(req: Request, res: Response) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const weight = req.body.weight;
      const weightUnits = req.body.weightUnits;
      const age = req.body.age;
      const gender = req.body.gender;

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      await registerUser({
        username,
        password: hashedPassword,
        weight,
        weightUnits,
        age,
        gender
      });
  
      await createNewUserProfile(username);

      const user = {
        username,
        password: hashedPassword
      }
  
      //@ts-ignore
      req.login(user, async (err: Error) => {
        if (err) {
          return res.send(err);
        }
        return res.send();
      });
  
    } catch (e) {
      throw e;
    }
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local'), (req: Request, res: Response) => {
    res.send();
});

router.post('/logout', checkAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.logOut((err: Error) => {
      if (err) { return next(err); }
    });
    res.clearCookie('connect.sid', {
      path: '/'
    }).send();
});

module.exports = router;

export {};