if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const passport = require('passport');
const initializePassport = require('./src/middleware/passport-config.ts');
const session = require('express-session');
const cors = require('cors');
const mainRoutes = require('./src/routes/mainRoutes.ts');
const usersRoutes = require('./src/routes/usersRoutes.ts');
const profileRoutes = require('./src/routes/profileRoutes.ts');
const workoutsRoutes = require('./src/routes/workoutsRoutes.ts');
const fileUpload = require('express-fileupload');
const db = require('./src/configs/db.config.ts');
const app = express();
const dodProdUrl = process.env.DOD_PROD_URL;
const dodDevUrl = process.env.DOD_DEV_URL;

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
app.use(cors({
  //@ts-ignore
  origin: (origin, callback) => {
    if (!origin || origin === dodProdUrl || origin === dodDevUrl) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use('/', mainRoutes);
app.use('/user', usersRoutes);
app.use('/profile', profileRoutes);
app.use('/workouts', workoutsRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Tyche listening on port ${port}`)
});