const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const { getUserPassword, getCurrentUser } = require('../controllers/usersController');

interface User {
    username: string,
    password: string
}

const initializePassport = (passport: any) => {
    const authenticateUser = async (username: string, password: string, done: any) => {
        const passResponse = await getUserPassword(username);

        if (passResponse.length === 0) {
            return done(null, false, { message: 'Username or password incorrect' });
        }

        const userPassword = passResponse[0].password;
        const user = await getCurrentUser(username);

        if (!user) {
            return done(null, false, { message: 'Username or password incorrect' });
        }

        try {
            if (await bcrypt.compare(password, userPassword)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Username or password incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    }
    
    passport.use(new LocalStrategy(authenticateUser));

    //this is how im storing the user away
    passport.serializeUser((user: User, done: any) => {
        done(null, user.username);
    });
      
    passport.deserializeUser(async (username: string, done: any) => {
        const user = await getCurrentUser(username);
        done(null, user);
    });
}

module.exports = initializePassport;

export {};