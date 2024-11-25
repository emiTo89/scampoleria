import React from 'react';
import { Link } from 'react-router-dom';

const App = ({ children }) => {
  return (
    <div className='App'>
      <nav
        style={{
          widht: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '1rem',
        }}
      >
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
      {children}
    </div>
  );
};

export default App;
