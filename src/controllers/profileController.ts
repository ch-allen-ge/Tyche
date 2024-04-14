const {
    createTheNewUserProfile,
    getUserProfile,
    updateTheTotalTimeSpent,
    updateTheNumberWorkoutsCompleted,
    getAllWorkoutsCompleted,
    saveProfilePicUrl,
    getTheProfilePicKey,
    setDefaultProfilePicUrl
} = require('../services/profile.service');

const {
  uploadTheProfilePicture,
  deleteTheProfilePicture
} = require('../utils/awsS3Utils');

const createNewUserProfile = async (username: string) => {
    try {
        const response = await createTheNewUserProfile(username);
        return response;
    } catch (e) {
        throw e;
    }
}

const getProfile = async (username: string) => {
  try {
    const profile = await getUserProfile(username);
    return profile[0];
  } catch (e) {
    throw e;
  }
}

const getWorkoutsCompleted = async (username: string) => {
  try {
    const response = await getAllWorkoutsCompleted(username);
    return response;
  } catch (e) {
      throw e;
  }
}

const updateTotalTimeSpent = async (timeSpent: string, username: string) => {
  try {
    updateTheTotalTimeSpent(timeSpent, username);
  } catch (e) {
    throw e;
  }
}

const updateNumberWorkoutsCompleted = async (username: string) => {
  try {
    updateTheNumberWorkoutsCompleted(username);
  } catch (e) {
    throw e;
  }
}

const uploadAndSaveProPic = async (image: Blob, username: string) => {
  const awsS3Key = await uploadTheProfilePicture(image);
  await saveProfilePicUrl(awsS3Key, username);
  return awsS3Key;
}

const getProfilePicKey = async (username: string) => {
  try {
    const response = await getTheProfilePicKey(username);
    return response;
  } catch (e) {
    throw e;
  }
}

const deleteProfilePicture = async (username: string) => {
  try {
    const getS3KeyResponse = await getTheProfilePicKey(username);
    const proPicKey = getS3KeyResponse[0].pro_pic_ssskey;

    await deleteTheProfilePicture(proPicKey);
    await setDefaultProfilePicUrl(username);
  } catch (e) {
    throw e;
  }
}

const setDefaultProfilePic = async (username: string) => {
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

export {};