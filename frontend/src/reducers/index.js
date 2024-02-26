import {combineReducers} from 'redux';
import {signInReducer, signUpReducer} from './authReducer';

// Combine signInReducer and signUpReducer into a single root reducer
export default combineReducers({
  user: signInReducer, // Reducer for managing signed-in user state
  userRegister: signUpReducer, // Reducer for managing signed-up user state
});
