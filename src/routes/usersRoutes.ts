const router = require('express').Router();
const { checkAuthenticated } = require('../utils/authenticationUtils');
const { getCurrentUser } = require('../controllers/usersController');
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    username: string,
  }
}

router.get('/getCurrentUser', checkAuthenticated, async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await getCurrentUser(req.user.username);
      res.send(user);
    } catch (e) {
      throw e;
    }
});

module.exports = router;

export {};