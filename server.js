if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const passport = require('passport');
const initializePassport = require('./src/middleware/passport-config.js');
const session = require('express-session');
const cors = require('cors');
const mainRoutes = require('./src/routes/mainRoutes.js');
const usersRoutes = require('./src/routes/usersRoutes.js');
const profileRoutes = require('./src/routes/profileRoutes.js');
const workoutsRoutes = require('./src/routes/workoutsRoutes.js');
const fileUpload = require('express-fileupload');
const db = require('./src/configs/db.config.js');
const app = express();

initializePassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  domain:'localhost',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
  },
  store: new (require('connect-pg-simple')(session))({
    pool: db
  })
}));
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({credentials: true, origin: true}));
app.use('/', mainRoutes);
app.use('/user', usersRoutes);
app.use('/profile', profileRoutes);
app.use('/workouts', workoutsRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Tyche listening on port ${port}`)
});