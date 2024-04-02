const { checkUserExists } = require('../controllers/usersController');

const validateForm = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (await checkUserExists(username)) {
        return res.status(400).json({
            type: 'username',
            message: 'Username already taken'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            type: 'password',
            message: 'Password too short'
        });
    }

    return next();
};

module.exports = {
    validateForm
};