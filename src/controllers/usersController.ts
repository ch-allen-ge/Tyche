const {
  checkTheUserExists,
  getTheCurrentUserWithoutPassword,
  registerNewUser,
  getUserHashedPassword
} = require('../services/users.service');

interface NewUser {
  username: string,
  password: string,
  weight: number,
  weightUnits: string,
  age: number,
  gender: string
}

const checkUserExists = async (username: string) => {
  try {
    const response = await checkTheUserExists(username);
    return response;
  } catch (e) {
    throw e;
  }
}

const getCurrentUser = async (username: string) => {
  try {
    const response = await getTheCurrentUserWithoutPassword(username);
    return response[0];
  } catch (e) {
    throw e;
  }
}

const registerUser = async (newUserDetails: NewUser) => {
  try {
    await registerNewUser(newUserDetails)
  } catch (e) {
    throw e;
  }
}

const getUserPassword = async(username: string) => {
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

export {};