import {combineReducers} from 'redux';
import {signInReducer, signUpReducer} from './authReducer';

export default combineReducers({
  user: signInReducer,
  userRegister: signUpReducer,
});
