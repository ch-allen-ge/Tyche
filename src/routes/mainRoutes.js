const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkAuthenticated, checkNotAuthenticated } = require('../utils/authenticationUtils');
const { registerUser } = require('../controllers/usersController');
const {
  createNewUserProfile,
  uploadAndSaveProPic,
  setDefaultProfilePic
} = require('../controllers/profileController');
const passport = require('passport');
const initializePassport = require('../../src/middleware/passport-config.js');
initializePassport(passport);

router.get('/checkHealth', (req, res) => {
  res.send('healthy');
});

router.get('/authenticateToken', checkAuthenticated, async (req, res) => {
    res.send('User authenticated');
});

router.post('/register', checkNotAuthenticated, async(req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      //only run if user doesnt already exist
      await registerUser({
        username,
        password: hashedPassword
      });
  
      await createNewUserProfile(username);

      if (req.files?.profilePic) {
        const image  = Buffer.from(req.files.profilePic.data, 'binary');
        await uploadAndSaveProPic(image, username);
      } else {
        await setDefaultProfilePic(username);
      }
  
      const user = {
        username,
        password: hashedPassword
      }
  
      req.login(user, async (err) => {
        if (err) {
          return res.status(500).send('failed to auto log in');
        }
        return res.send();
      });
  
    } catch (e) {
      throw e;
    }
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local'), (req, res) => {
    res.send();
});

router.post('/logout', checkAuthenticated, (req, res, next) => {
    req.logOut((err) => {
      if (err) { return next(err); }
    });
    res.clearCookie('connect.sid', {
      path: '/'
    }).send();
});

module.exports = router;