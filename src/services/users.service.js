const  executeQuery = require('../database/db');

const getTheCurrentUserWithoutPassword = async (username) => {
    const query = 'select user_id, username, joined_date from users where username=$1';
    const values = [username];
    const resp = await executeQuery(query, values);
    return resp;
}

const getUserHashedPassword = async (username) => {
    const query = 'select password from users where username=$1';
    const values = [username];
    const resp = await executeQuery(query, values);
    return resp;
}

const registerNewUser = async (newUserDetails) => {
    const username = newUserDetails.username;
    const password = newUserDetails.password;
    const joined_date = new Date();
    
    const query = 'insert into users(username, password, joined_date) values($1, $2, $3)'
    const values = [username, password, joined_date];

    try {
        await executeQuery(query, values);
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getTheCurrentUserWithoutPassword,
    registerNewUser,
    getUserHashedPassword
}