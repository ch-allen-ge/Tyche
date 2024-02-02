const {
    createTheNewUserProfile,
    getUserProfile,
    updateTheTotalTimeSpent,
    updateTheNumberWorkoutsCompleted,
    addNewWorkoutCompleted,
    getAllWorkoutsCompleted,
    saveProfilePicUrl,
    getTheProfilePicKey,
    setDefaultProfilePicUrl
} = require('../services/profile.service');

const {
  uploadTheProfilePicture,
  deleteTheProfilePicture
} = require('../utils/awsS3Utils');

const createNewUserProfile = async (username) => {
    try {
        const response = await createTheNewUserProfile(username);
        return response;
    } catch (e) {
        throw e;
    }
}

const getProfile = async (username) => {
  try {
    const profile = await getUserProfile(username);
    return profile[0];
  } catch (e) {
    throw e;
  }
}

const getWorkoutsCompleted = async (username) => {
  try {
    const response = await getAllWorkoutsCompleted(username);
    return response;
  } catch (e) {
      throw e;
  }
}

const updateTotalTimeSpent = async (timeSpent, username) => {
  try {
    updateTheTotalTimeSpent(timeSpent, username);
  } catch (e) {
    throw e;
  }
}

const updateNumberWorkoutsCompleted = async (username) => {
  try {
    updateTheNumberWorkoutsCompleted(username);
  } catch (e) {
    throw e;
  }
}

const uploadAndSaveProPic = async (image, username) => {
  const awsS3Key = await uploadTheProfilePicture(image);
  await saveProfilePicUrl(awsS3Key, username);
  return awsS3Key;
}

const getProfilePicKey = async (username) => {
  try {
    const response = await getTheProfilePicKey(username);
    return response;
  } catch (e) {
    throw e;
  }
}

const deleteProfilePicture = async (username) => {
  try {
    const getS3KeyResponse = await getTheProfilePicKey(username);
    const proPicKey = getS3KeyResponse[0].pro_pic_ssskey;

    await deleteTheProfilePicture(proPicKey);
    await setDefaultProfilePicUrl(username);
  } catch (e) {
    throw e;
  }
}

const setDefaultProfilePic = async (username) => {
  try {
    await setDefaultProfilePicUrl(username);
  } catch (e) {
    throw e;
  }
}

module.exports = {
    getProfile,
    createNewUserProfile,
    updateTotalTimeSpent,
    updateNumberWorkoutsCompleted,
    getWorkoutsCompleted,
    uploadAndSaveProPic,
    getProfilePicKey,
    deleteProfilePicture,
    setDefaultProfilePic
};