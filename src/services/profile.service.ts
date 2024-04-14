const executeQuery = require('../database/db');

const getUserProfile = async (username: string) => {
    const query = 'select number_workouts_completed, to_char(total_time_spent, \'HH24:MI:SS\') total_time_spent from profiles where username=$1';
    const values = [username];
    const resp = await executeQuery(query, values);
    return resp;
};

const getAllWorkoutsCompleted = async (username: string) => {
    const query = 'select * from workouts_completed where username=$1';
    const values = [username];
    const resp = await executeQuery(query, values);
    return resp;
}

const createTheNewUserProfile = async (username: string) => {
    const query = 'insert into profiles(username, number_workouts_completed, total_time_spent) values ($1, 0, \'0 h 0 m 0 s\')';
    const values = [username];
    return await executeQuery(query, values);
};

const updateTheTotalTimeSpent = async (timeSpent: string, username: string) => {
    const query = 'update profiles set total_time_spent=total_time_spent + $1 where username=$2';
    const values = [timeSpent, username];
    return await executeQuery(query, values);
};

const updateTheNumberWorkoutsCompleted = async (username: string) => {
    const query = 'update profiles set number_workouts_completed=number_workouts_completed + 1 where username=$1';
    const values = [username];
    return await executeQuery(query, values);
};

const saveProfilePicUrl = async (s3key: string, username: string) => {
    const query = 'update profiles set pro_pic_ssskey=$1 where username=$2';
    const values = [s3key, username];
    return await executeQuery(query, values);
};

const getTheProfilePicKey = async (username: string) => {
    const query = 'select pro_pic_ssskey from profiles where username=$1';
    const values = [username];
    return await executeQuery(query, values);
};

const setDefaultProfilePicUrl = async (username: string) => {
    const query = 'update profiles set pro_pic_ssskey=null where username=$1';
    const values = [username];
    return await executeQuery(query, values);
};

module.exports = {
    getUserProfile,
    createTheNewUserProfile,
    updateTheTotalTimeSpent,
    updateTheNumberWorkoutsCompleted,
    getAllWorkoutsCompleted,
    saveProfilePicUrl,
    getTheProfilePicKey,
    setDefaultProfilePicUrl
};