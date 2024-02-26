// Action types for handling fetch errors
export const ERROR = 'FETCH_ERROR';

// Action types for user sign-in
export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'; // Requesting sign-in
export const SIGNIN = 'SIGNIN'; // Successful sign-in

// Action types for user sign-up
export const SIGNUP_REQUEST = 'SIGNIN_REQUEST'; // Requesting sign-up
export const SIGNUP = 'SIGNUP'; // Successful sign-up
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'; // Successful sign-up
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'; // Failed sign-up

// Action type for user logout
export const LOGOUT = 'LOGOUT';

// Action type for authentication error
export const AUTH_ERROR = 'AUTH_ERROR';

// Action types for updating user profile
export const UPDATE_PROFILE_REQ = 'UPDATE_PROFILE_REQ'; // Requesting profile update
export const UPDATE_PROFILE = 'UPDATE_PROFILE'; // Successful profile update
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR'; // Failed profile update
