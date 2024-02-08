import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {updateprofile} from '../actions/auth';
import {Link} from 'react-router-dom';
import Spinner from '../components/Spinner'; // Import the Spinner component

const Profile = () => {
  const user = useSelector((state) => state.user?.user);
  const [showBtn, setShowBtn] = useState(false);
  const [submitting, setSubmitting] = useState(false); // State to track form submission
  const dispatch = useDispatch();

  // Define Yup schema for form validation
  const schema = yup.object().shape({
    name: yup.string().required('Full Name is required'),
    mobNo: yup.string().required('Mobile No. is required'),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true); // Start form submission
    await dispatch(updateprofile(data)); // Dispatch updateprofile action
    setShowBtn(false);
    setSubmitting(false); // End form submission
  };

  return (
    <>
      <div className="mainarea all-oredrs">
        <div className="profile-section">
          {user ? (
            <>
              <div className="profile-photo">
                <h1>{user?.name?.charAt(0)}</h1>
              </div>
              <div className="profile-detail ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="profile-input input-group">
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      defaultValue={user?.name}
                      onChange={() => setShowBtn(true)}
                    />
                    <label htmlFor="name">Full Name</label>
                    {errors.name && (
                      <span className="error">{errors.name.message}</span>
                    )}
                  </div>
                  <div className="profile-input input-group">
                    <input
                      type="text"
                      id="email"
                      placeholder="Email"
                      readOnly
                      value={user?.eamil}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="profile-input input-group">
                    <input
                      type="number"
                      maxLength={10}
                      id="mob"
                      placeholder="Mobile No."
                      {...register('mobNo')}
                      defaultValue={user?.mobNo}
                      onChange={() => setShowBtn(true)}
                    />
                    <label htmlFor="mob">Mobile No.</label>
                    {errors.mobNo && (
                      <span className="error">{errors.mobNo.message}</span>
                    )}
                  </div>
                  {/* Render the spinner if submitting */}
                  {submitting ? (
                    <Spinner />
                  ) : (
                    // Render the update button
                    showBtn && <button type="submit">UPDATE</button>
                  )}
                </form>
              </div>
            </>
          ) : (
            <div>
              <h1>
                You are not Logged In!, Please <Link to="/signin">Login</Link>
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
