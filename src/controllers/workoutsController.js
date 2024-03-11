const {
    saveTheCustomWorkout,
    getTheCustomWorkouts,
    saveTheCompletedWorkout,
    getTheCompletedWorkouts
} = require('../services/workouts.service');


const saveCustomWorkout = async (username, workoutDetails) => {
    try {
        await saveTheCustomWorkout(username, workoutDetails);
    } catch (e) {
        throw e;
    }
};

const getCustomWorkouts = async (username) => {
    try {
        const response = await getTheCustomWorkouts(username);
        return response;
    } catch (e) {
        throw e;
    }
}

const saveCompletedWorkout = async (username, workoutDetails, dateCompleted) => {
    try {
        const response = await saveTheCompletedWorkout(username, workoutDetails, dateCompleted);
        return response;
    } catch (e) {
        throw e;
    }
}

const getCompletedWorkouts = async (username, startIndex) => {
    try {
        const response = await getTheCompletedWorkouts(username, startIndex);
        return response;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    saveCustomWorkout,
    getCustomWorkouts,
    saveCompletedWorkout,
    getCompletedWorkouts
}