const router = require('express').Router();
const { checkAuthenticated } = require('../utils/authenticationUtils');
const { getCurrentUser } = require('../controllers/usersController');

router.get('/getCurrentUser', checkAuthenticated, async (req, res) => {
    try {
      const user = await getCurrentUser(req.user.username);
      res.send(user);
    } catch (e) {
      throw e;
    }
});

module.exports = router;