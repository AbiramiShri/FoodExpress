import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../components/Spinner';
import {signupUser} from '../actions/auth';
import Logo from '../assets/images/logo.jpeg';

const Signup = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userRegister);
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = user?.user;
  const redirect = location.search ? `/${location.search.split('=')[1]}` : '/';

  // Yup schema for form validation
  let schema = yup.object().shape({
    name: yup.string().required('Please Enter your Name'),
    email: yup.string().required('Please Enter your Email').email(),
    password: yup
      .string()
      .required('Please Enter your password')
      .test(
        'regex',
        'Password must be min 6 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase',
        (val) => {
          let regExp = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
          );
          return regExp.test(val);
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Function to handle form submission
  const submitHandler = (data) => {
    dispatch(signupUser(data.name, data.email, data.password));
    setLoading(true);
  };

  useEffect(() => {
    // Redirect if user info is available
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo]);

  return (
    <div className="auth p-5 mt-5">
      <div className="form">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        {/* Display error message if any */}
        {user?.error && <div className="err">{user?.error}</div>}
        {/* Sign-up form */}
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Name input */}
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              {...register('name', {required: true})}
            />
            <label>Name</label>
          </div>
          {/* Display name validation error message if any */}
          {errors?.name?.message && (
            <p className="err">{errors?.name?.message}</p>
          )}
          {/* Email input */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register('email', {required: true})}
            />
            <label>Email</label>
          </div>
          {/* Display email validation error message if any */}
          {errors?.email?.message && (
            <p className="err">{errors?.email?.message}</p>
          )}
          {/* Password input */}
          <div className="input-group">
            <input
              type="password"
              name="password"
              id=""
              placeholder="Password"
              {...register('password', {required: true})}
            />
            <label>Password</label>
          </div>
          {/* Display password validation error message if any */}
          {errors?.password?.message && (
            <p className="err">{errors?.password?.message}</p>
          )}
          {/* Submit button */}
          <button type="submit">
            {/* Render spinner if loading, else render 'Register' */}
            {user?.loading ? <Spinner /> : 'Register'}
          </button>
        </form>
        {/* Link to sign-in */}
        <div className="forget">
          <p className="mb-0">Already a user?</p>{' '}
          <Link className="text-uppercase" to="/signin">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
