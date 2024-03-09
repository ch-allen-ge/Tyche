const router = require('express').Router();
const { checkAuthenticated } = require('../utils/authenticationUtils');

const {
    saveCustomWorkout,
    getCustomWorkouts,
    saveCompletedWorkout,
    getCompletedWorkouts
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
        const response = await getCompletedWorkouts(username);
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
        await saveCompletedWorkout(username, workoutDetails, dateCompleted);

        res.send();
    } catch (e) {
      throw e;
    }
});

//route for add completed workout

module.exports = router;