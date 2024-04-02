const {
  checkTheUserExists,
  getTheCurrentUserWithoutPassword,
  registerNewUser,
  getUserHashedPassword
} = require('../services/users.service');

const checkUserExists = async (username) => {
  try {
    const response = await checkTheUserExists(username);
    return response;
  } catch (e) {
    throw e;
  }
}

const getCurrentUser = async (username) => {
  try {
    const response = await getTheCurrentUserWithoutPassword(username);
    return response[0];
  } catch (e) {
    throw e;
  }
}

const registerUser = async (newUserDetails) => {
  try {
    await registerNewUser(newUserDetails)
  } catch (e) {
    throw e;
  }
}

const getUserPassword = async(username) => {
  try {
    const response = await getUserHashedPassword(username);
    return response;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  checkUserExists,
  getCurrentUser,
  registerUser,
  getUserPassword
}

//export {};