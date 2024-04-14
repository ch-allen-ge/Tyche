const {
    saveTheCustomWorkout,
    deleteTheCustomWorkout,
    getTheCustomWorkouts,
    saveTheCompletedWorkout,
    getTheCompletedWorkouts,
    setTheRating,
    saveTheNote
} = require('../services/workouts.service');

interface Workout {
    name: string
    clubs_exercise: string,
    diamonds_exercise: string,
    hearts_exercise: string,
    spades_exercise: string,
    aces_exercise: string,
    breakout_aces: boolean,
    timer_used: boolean,
    aces_minutes_to_do: number,
    aces_seconds_to_do: number
};

interface CompletedWorkout extends Workout {
    time_spent: string,
}


const saveCustomWorkout = async (username: string, workoutDetails: Workout) => {
    try {
        await saveTheCustomWorkout(username, workoutDetails);
    } catch (e) {
        throw e;
    };
};

const deleteCustomWorkout = async (customWorkoutId: number) => {
    try {
        await deleteTheCustomWorkout(customWorkoutId);
    } catch (e) {
        throw e;
    };
};

const getCustomWorkouts = async (username: string) => {
    try {
        const response = await getTheCustomWorkouts(username);
        return response;
    } catch (e) {
        throw e;
    };
};

const saveCompletedWorkout = async (username: string, workoutDetails: CompletedWorkout, dateCompleted: Date) => {
    try {
        const response = await saveTheCompletedWorkout(username, workoutDetails, dateCompleted);
        return response;
    } catch (e) {
        throw e;
    };
};

const getCompletedWorkouts = async (username: string, startIndex: number) => {
    try {
        const response = await getTheCompletedWorkouts(username, startIndex);
        return response;
    } catch (e) {
        throw e;
    };
};

const setRating = async (workoutCompletedId: number, rating: number) => {
    try {
        await setTheRating(workoutCompletedId, rating);
    } catch (e) {
        throw e;
    };
};

const saveNote = async (workoutCompletedId: number, note: String) => {
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

export {};