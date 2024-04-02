const  executeQuery = require('../database/db');

const checkTheUserExists = async (username) => {
    const query = 'select count(*) from users where username=$1';
    const values = [username];
    const resp = await executeQuery(query, values);
    const foundUser = resp[0].count > 0;
    return foundUser;
}

const getTheCurrentUserWithoutPassword = async (username) => {
    const query = 'select user_id, username, joined_date, age, gender, weight, weight_units from users where username=$1';
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

const registerNewUser = async ({
    username,
    password,
    weight,
    weightUnits,
    age,
    gender
}) => {
    const joined_date = new Date();
    
    const query = 'insert into users(username, password, weight, weight_units, age, gender, joined_date) values($1, $2, $3, $4, $5, $6, $7)'
    const values = [username, password, weight, weightUnits, age, gender, joined_date];

    try {
        await executeQuery(query, values);
    } catch (e) {
        throw e;
    }
}

module.exports = {
    checkTheUserExists,
    getTheCurrentUserWithoutPassword,
    registerNewUser,
    getUserHashedPassword
}