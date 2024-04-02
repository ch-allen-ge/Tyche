const router = require('express').Router();
const { checkAuthenticated } = require('../utils/authenticationUtils');

const {
    saveCustomWorkout,
    deleteCustomWorkout,
    getCustomWorkouts,
    saveCompletedWorkout,
    getCompletedWorkouts,
    setRating,
    saveNote
} = require('../controllers/workoutsController');

router.get('/getSavedWorkouts', checkAuthenticated, async (req, res) => {
    try {
        const username = req.user.username;
        const response = await getCustomWorkouts(username);
        res.json(response);
    } catch (e) {
        throw e;
    }
});

router.delete('/deleteSavedWorkout', checkAuthenticated, async (req, res) => {
    try {
        const customWorkoutId = req.query.customWorkoutId;
        await deleteCustomWorkout(customWorkoutId);
        res.send();
    } catch (e) {
        throw e;
    }
});

router.post('/saveCustomWorkout', checkAuthenticated, async (req, res) => {
    try {
        const workoutDetails = req.body;
        const username = req.user.username;
        await saveCustomWorkout(username, workoutDetails);

        res.send();
    } catch (e) {
      throw e;
    }
});

router.get('/getCompletedWorkouts', checkAuthenticated, async (req, res) => {
    try {
        const username = req.user.username;
        const startIndex = req.query.startIndex;
        const response = await getCompletedWorkouts(username, startIndex);
        res.json(response);
    } catch (e) {
        throw e;
    }
});

router.post('/saveCompletedWorkout', checkAuthenticated, async (req, res) => {
    try {
        const username = req.user.username;
        const workoutDetails = req.body;
        const dateCompleted = new Date();
        const savedWorkoutId = await saveCompletedWorkout(username, workoutDetails, dateCompleted);
        res.send(savedWorkoutId);
    } catch (e) {
      throw e;
    }
});

router.patch('/setRating', checkAuthenticated, async (req, res) => {
    try {
        const workoutCompletedId = req.body.workoutCompletedId;
        const rating = req.body.rating;
        await setRating(workoutCompletedId, rating);

        res.send();
    } catch (e) {
        throw e;
    }
});

router.patch('/saveNote', checkAuthenticated, async (req, res) => {
    try {
        const workoutCompletedId = req.body.workoutCompletedId;
        const note = req.body.note;
        await saveNote(workoutCompletedId, note);

        res.send();
    } catch (e) {
        throw e;
    }
});



//set default numbers for initial workout completed save, like 0 for rating and '' for notes, and all the rest

module.exports = router;