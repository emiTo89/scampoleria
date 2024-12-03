import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  return (
    <nav
      style={{
        widht: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '1rem',
      }}
    >
      {!user ? (
        <Link
          style={{ textDecoration: 'none', color: '#000', marginRight: '1rem' }}
          to={'/auth'}
        >
          {' '}
          Auth
        </Link>
      ) : (
        <Link
          style={{ textDecoration: 'none', color: '#000', marginRight: '1rem' }}
          to={'/add-product'}
        >
          New product
        </Link>
      )}
      <Link
        style={{ textDecoration: 'none', color: '#000', marginRight: '1rem' }}
        to={'/products'}
      >
        See products
      </Link>
      <Link
        style={{ textDecoration: 'none', color: '#000', marginRight: '1rem' }}
        to={'/'}
      >
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
