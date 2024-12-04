import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import apiRequest from '../api';
import endpoints from '../api/endpoints/endpoints';
import { logout } from '../store/reducers/userReducer';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const response = await apiRequest('GET', endpoints.auth.logout);

      if (response) {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      style={{
        widht: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'justify-between',
        padding: '1rem',
      }}
    >
      <div
        style={{
          flex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'justify-between',
        }}
      >
        {!user ? (
          <button>
            <Link
              style={{
                textDecoration: 'none',
                color: '#000',
                marginRight: '1rem',
              }}
              to={'/auth'}
            >
              Auth
            </Link>
          </button>
        ) : (
          <>
            <button
              style={{
                textDecoration: 'none',
                color: '#000',
                marginRight: '1rem',
              }}
              to={'/auth'}
              onClick={logoutUser}
            >
              Logout
            </button>
            <button>
              <Link
                style={{
                  textDecoration: 'none',
                  color: '#000',
                  marginRight: '1rem',
                }}
                to={'/add-product'}
              >
                New product
              </Link>
            </button>
          </>
        )}
        <button>
          <Link
            style={{
              textDecoration: 'none',
              color: '#000',
              marginRight: '1rem',
            }}
            to={'/products'}
          >
            See products
          </Link>
        </button>
        <button>
          <Link
            style={{
              textDecoration: 'none',
              color: '#000',
              marginRight: '1rem',
            }}
            to={'/'}
          >
            Home
          </Link>
        </button>
      </div>
      {user ? (
        <div
          style={{
            flex: 1,
            textTransform: 'capitalize',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <p>User: {user.user?.username?.replace('.', ' ')}</p>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
