const  executeQuery = require('../database/db');

const saveTheCustomWorkout = async (username, workoutDetails) => {
    const query = 
        'insert into saved_custom_workouts(username, name, clubs_exercise, diamonds_exercise, hearts_exercise, \
        spades_exercise, aces_exercise, breakout_aces, timer_used, aces_minutes_to_do, aces_seconds_to_do) \
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    const values = [username, ...Object.values(workoutDetails)];

    try {
        await executeQuery(query, values);
    } catch (e) {
        throw e;
    }
}

const getTheCustomWorkouts = async (username) => {
    const query =
        'select name, clubs_exercise, diamonds_exercise, hearts_exercise, spades_exercise, aces_exercise, \
        breakout_aces, timer_used, aces_minutes_to_do, aces_seconds_to_do from saved_custom_workouts \
        where username=$1';
    const values = [username];

    try {
        const response = await executeQuery(query, values);
        return response;
    } catch (e) {
        throw e;
    }
}

const saveTheCompletedWorkout = async (username, workoutDetails, dateCompleted) => {
    const query = 
        'insert into workouts_completed(username, time_spent, clubs_exercise, diamonds_exercise, hearts_exercise, \
        spades_exercise, aces_exercise, breakout_aces, timer_used, aces_minutes_to_do, aces_seconds_to_do, date_completed) \
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
    const values = [username, ...Object.values(workoutDetails), dateCompleted];

    try {
        await executeQuery(query, values);
    } catch (e) {
        throw e;
    }
}

const getTheCompletedWorkouts = async (username) => {
    const query =
        'select clubs_exercise, diamonds_exercise, hearts_exercise, spades_exercise, aces_exercise, \
        breakout_aces, timer_used, aces_minutes_to_do, aces_seconds_to_do, time_spent, date_completed \
        from workouts_completed where username=$1';
    const values = [username];

    try {
        const response = await executeQuery(query, values);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    saveTheCustomWorkout,
    getTheCustomWorkouts,
    saveTheCompletedWorkout,
    getTheCompletedWorkouts
}