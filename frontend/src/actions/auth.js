import authApi from '../api/authApi'; // Importing authentication API module
import {
  AUTH_ERROR,
  LOGOUT,
  SIGNIN,
  SIGNIN_REQUEST,
  SIGNUP,
  SIGNUP_REQUEST,
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_REQ,
} from './types'; // Importing action types

// Action creator to sign in a user
export const signinUser = (email, password) => async (dispatch, getState) => {
  dispatch({type: SIGNIN_REQUEST}); // Dispatching action to indicate signin request is in progress
  try {
    const {data} = await authApi.post('/api/users/signin', {email, password}); // Making API call to signin user
    dispatch({type: SIGNIN, payload: data}); // Dispatching action with user data upon successful signin
    localStorage.setItem('User', JSON.stringify(data)); // Storing user data in local storage
  } catch (error) {
    // Handling error if signin fails
    dispatch({
      type: AUTH_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // Extracting error message from response or using default message
    });
  }
};

// Action creator to sign up a user
export const signupUser = (name, email, password) => async (dispatch) => {
  dispatch({type: SIGNUP_REQUEST}); // Dispatching action to indicate signup request is in progress
  try {
    const {data} = await authApi.post('/api/users/signup', {
      // Making API call to signup user
      name,
      email,
      password,
    });
    dispatch({type: SIGNUP, payload: data}); // Dispatching action with user data upon successful signup
    localStorage.setItem('User', JSON.stringify(data)); // Storing user data in local storage
  } catch (error) {
    // Handling error if signup fails
    dispatch({
      type: AUTH_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // Extracting error message from response or using default message
    });
  }
};

// Action creator to update user profile
export const updateprofile = (userInfo) => async (dispatch, getState) => {
  dispatch({type: UPDATE_PROFILE_REQ, payload: userInfo}); // Dispatching action to indicate profile update request is in progress
  try {
    const user = getState().user?.user; // Getting current user from state
    const {data} = await authApi.put('/api/users/updateProfile', userInfo, {
      // Making API call to update user profile
      headers: {
        Authorization: `Bearer ${user.token}`, // Sending authorization token in request header
      },
    });
    dispatch({type: UPDATE_PROFILE, payload: data}); // Dispatching action with updated user data
    localStorage.setItem('User', JSON.stringify(data)); // Storing updated user data in local storage
  } catch (error) {
    // Handling error if profile update fails
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // Extracting error message from response or using default message
    });
  }
};

// Action creator to logout user
export const logout = () => async (dispatch) => {
  localStorage.removeItem('User'); // Removing user data from local storage
  dispatch({type: LOGOUT}); // Dispatching action to logout user
};
