const  executeQuery = require('../database/db');

interface NewUser {
    username: string,
    password: string,
    weight: number,
    weightUnits: string,
    age: number,
    gender: string
}

const checkTheUserExists = async (username: string) => {
    const query = 'select count(*) from users where username=$1';
    const values = [username];
    const resp = await executeQuery(query, values);
    const foundUser = resp[0].count > 0;
    return foundUser;
}

const getTheCurrentUserWithoutPassword = async (username: string) => {
    const query = 'select user_id, username, joined_date, age, gender, weight, weight_units from users where username=$1';
    const values = [username];
    const resp = await executeQuery(query, values);
    return resp;
}

const getUserHashedPassword = async (username: string) => {
    const query = 'select password from users where username=$1';
    const values = [username];
    const resp = await executeQuery(query, values);
    return resp;
}

const registerNewUser = async (newUser: NewUser) => {
    const joined_date = new Date();
    
    const query = 'insert into users(username, password, weight, weight_units, age, gender, joined_date) values($1, $2, $3, $4, $5, $6, $7)'
    const values = [...Object.values(newUser), joined_date];

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
};

export {};