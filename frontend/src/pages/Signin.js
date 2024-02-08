import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../components/Spinner';
import {signinUser} from '../actions/auth';
import Logo from '../assets/images/logo.jpeg';

const Signin = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = user?.user;
  const redirect = location.search ? `/${location.search.split('=')[1]}` : '/';

  let schema = yup.object().shape({
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

  const submitHandler = (data) => {
    dispatch(signinUser(data.email, data.password));
    setLoading(true);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo]);

  return (
    <div className="auth  p-5 mt-5">
      <div className="form">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        {user?.error && <div className="err">{user?.error}</div>}
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register('email', {required: true})}
            />
            <label>Email</label>
          </div>
          {errors?.email?.message && (
            <p className="err">{errors?.email?.message}</p>
          )}
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
          {errors?.password?.message && (
            <p className="err">{errors?.password?.message}</p>
          )}
          {/* <div className="text">
            <Link to="/updatepassword">
              <p>Forget Password?</p>
            </Link>
          </div> */}
          <button className="text-uppercase" type="submit">
            {user?.loading ? <Spinner /> : 'Login'}
          </button>
        </form>
        <div className="forget">
          <p className="mb-0">New user?</p> <Link to="/signup">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
