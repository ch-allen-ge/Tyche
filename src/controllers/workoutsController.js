const {
    saveTheCustomWorkout,
    deleteTheCustomWorkout,
    getTheCustomWorkouts,
    saveTheCompletedWorkout,
    getTheCompletedWorkouts,
    setTheRating,
    saveTheNote
} = require('../services/workouts.service');


const saveCustomWorkout = async (username, workoutDetails) => {
    try {
        await saveTheCustomWorkout(username, workoutDetails);
    } catch (e) {
        throw e;
    };
};

const deleteCustomWorkout = async (customWorkoutId) => {
    try {
        await deleteTheCustomWorkout(customWorkoutId);
    } catch (e) {
        throw e;
    };
};

const getCustomWorkouts = async (username) => {
    try {
        const response = await getTheCustomWorkouts(username);
        return response;
    } catch (e) {
        throw e;
    };
};

const saveCompletedWorkout = async (username, workoutDetails, dateCompleted) => {
    try {
        const response = await saveTheCompletedWorkout(username, workoutDetails, dateCompleted);
        return response;
    } catch (e) {
        throw e;
    };
};

const getCompletedWorkouts = async (username, startIndex) => {
    try {
        const response = await getTheCompletedWorkouts(username, startIndex);
        return response;
    } catch (e) {
        throw e;
    };
};

const setRating = async (workoutCompletedId, rating) => {
    try {
        await setTheRating(workoutCompletedId, rating);
    } catch (e) {
        throw e;
    };
};

const saveNote = async (workoutCompletedId, note) => {
    try {
        await saveTheNote(workoutCompletedId, note);
    } catch (e) {
        throw e;
    };
};

module.exports = {
    saveCustomWorkout,
    deleteCustomWorkout,
    getCustomWorkouts,
    saveCompletedWorkout,
    getCompletedWorkouts,
    setRating,
    saveNote
}