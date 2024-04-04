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
    };
};

const deleteTheCustomWorkout = async (customWorkoutId) => {
    const query = 'delete from saved_custom_workouts where saved_custom_workout_id=$1';
    const values = [customWorkoutId];

    try {
        await executeQuery(query, values);
    } catch (e) {
        throw e;
    };
};

const getTheCustomWorkouts = async (username) => {
    const query =
        'select saved_custom_workout_id, name, clubs_exercise, diamonds_exercise, hearts_exercise, spades_exercise, aces_exercise, \
        breakout_aces, timer_used, aces_minutes_to_do, aces_seconds_to_do from saved_custom_workouts \
        where username=$1';
    const values = [username];

    try {
        const response = await executeQuery(query, values);
        return response;
    } catch (e) {
        throw e;
    };
};

const saveTheCompletedWorkout = async (username, workoutDetails, dateCompleted) => {
    const query = 
        'insert into workouts_completed(username, name, time_spent, clubs_exercise, diamonds_exercise, hearts_exercise, \
        spades_exercise, aces_exercise, breakout_aces, timer_used, aces_minutes_to_do, aces_seconds_to_do, calories_burnt, \
        power_score, average_heart_rate, hr_monitor_used, date_completed) \
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning workout_completed_id';
    const values = [username, ...Object.values(workoutDetails), dateCompleted];

    try {
        const response =  await executeQuery(query, values);
        return response;
    } catch (e) {
        throw e;
    };
};

const getTheCompletedWorkouts = async (username, startIndex) => {
    const query =
        'select * from workouts_completed where username=$1 order by workout_completed_id desc offset $2 limit 10';
    const values = [username, startIndex];

    try {
        const response = await executeQuery(query, values);
        return response;
    } catch (e) {
        throw e;
    };
};

const setTheRating = async (workoutCompletedId, rating) => {
    const query = 'update workouts_completed set rating=$2 where workout_completed_id=$1;';
    const values = [workoutCompletedId, rating];

    try {
        await executeQuery(query, values);
    } catch (e) {
        throw e;
    }
};

const saveTheNote = async (workoutCompletedId, note) => {
    const query = 'update workouts_completed set notes=$2 where workout_completed_id=$1;';
    const values = [workoutCompletedId, note];

    try {
        await executeQuery(query, values);
    } catch (e) {
        throw e;
    }
}

module.exports = {
    saveTheCustomWorkout,
    deleteTheCustomWorkout,
    getTheCustomWorkouts,
    saveTheCompletedWorkout,
    getTheCompletedWorkouts,
    setTheRating,
    saveTheNote
}