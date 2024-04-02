const router = require('express').Router();
const { checkAuthenticated } = require('../utils/authenticationUtils');
const {
  getProfile,
  updateTotalTimeSpent,
  updateNumberWorkoutsCompleted,
  getWorkoutsCompleted,
  getProfilePicKey,
  deleteProfilePicture,
  uploadAndSaveProPic
} = require('../controllers/profileController');

router.get('/getProfile', checkAuthenticated, async (req, res) => {
  try {
    const profile = await getProfile(req.user.username);
    res.send(profile);
  } catch (e) {
    throw e;
  }
});

router.get('/getWorkoutsCompleted', checkAuthenticated, async (req, res) => {
  try {
    const workoutsCompleted = await getWorkoutsCompleted(req.user.username);
    res.send(workoutsCompleted);
  } catch (e) {
    throw e;
  }
});

router.get('/getProfilePicUrl', checkAuthenticated, async (req, res) => {
  try {
    let proPicUrl = '';

    const response = await getProfilePicKey(req.user.username);

    if (response[0].pro_pic_ssskey === null) {
      proPicUrl = null;
    } else {
      const proPicKey = response[0].pro_pic_ssskey;
      proPicUrl = process.env.AWS_S3_BUCKET_URL + proPicKey;
    }

    res.send(proPicUrl);
  } catch (e) {
    throw e;
  }
});

router.post('/uploadAndSaveProPic', checkAuthenticated, async (req, res) => {
  try {
    const image  = Buffer.from(req.files.profilePic.data, 'binary');
    const username = req.user.username;
    const awsS3key = await uploadAndSaveProPic(image, username);
    const newS3Url = process.env.AWS_S3_BUCKET_URL + awsS3key;
    res.send(newS3Url);
  } catch (e) {
    throw e;
  }
});

router.patch('/updateTotalTimeSpent', checkAuthenticated, async (req, res) => {
  try {
    const timeSpent = req.body.timeSpent;
    const username = req.user.username;
    await updateTotalTimeSpent(timeSpent, username);
    res.send();
  } catch (e) {
    throw e;
  }
});

router.patch('/updateNumberWorkoutsCompleted', checkAuthenticated, async (req, res) => {
  try {
    await updateNumberWorkoutsCompleted(req.user.username);
    res.send();
  } catch (e) {
    throw e;
  }
});

router.delete('/deleteProfilePicture', checkAuthenticated, async (req, res) => {
  try {
    await deleteProfilePicture(req.user.username);
    res.send();
  } catch (e) {
    throw e;
  }
});

module.exports = router;
  