import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import endpoints from '../api/endpoints/endpoints';
import apiRequest from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/reducers/userReducer';

const AuthPage = () => {
  const user = useSelector((store) => store.user?.user);

  const [loggedin, setLoggedin] = useState(false);
  const [signin, setSignin] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const response = await apiRequest('POST', endpoints.auth.signIn, {
        username,
        email,
        password,
        confirmedPassword,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const logIn = async () => {
    try {
      const response = await apiRequest('POST', endpoints.auth.login, {
        email,
        password,
      });

      dispatch(login(response));
      navigate('/products', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return user ? (
    <Navigate to='/' replace />
  ) : (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyItems: 'center',
        justifyContent: 'center',
        margin: '2rem',
      }}
    >
      {!signin && !loggedin ? (
        <>
          <button onClick={() => setSignin(true)}>SIGNIN</button>
          <button onClick={() => setLoggedin(true)}>LOGIN</button>
        </>
      ) : null}
      {loggedin ? (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '30rem',
            }}
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              style={{ margin: '1rem 0', padding: '1rem' }}
              name='email-username'
              placeholder='Insert email or username'
              type='text'
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              style={{ margin: '1rem 0', padding: '1rem' }}
              name='password'
              placeholder='Insert password'
              type='number'
            />
            <button onClick={logIn}>Login</button>
          </div>
        </>
      ) : signin ? (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '30rem',
            }}
          >
            <input
              onChange={(e) => setUsername(e.target.value)}
              style={{ margin: '1rem 0', padding: '1rem' }}
              name='username'
              placeholder='Insert username'
              type='text'
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              style={{ margin: '1rem 0', padding: '1rem' }}
              name='email'
              placeholder='Insert email'
              type='text'
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              style={{ margin: '1rem 0', padding: '1rem' }}
              type='text'
              name='password'
              placeholder='Insert password'
            />
            <input
              onChange={(e) => setConfirmedPassword(e.target.value)}
              style={{ margin: '1rem 0', padding: '1rem' }}
              type='text'
              name='password'
              placeholder='Confirm password'
            />
            <button onClick={signIn}>Signin</button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AuthPage;
