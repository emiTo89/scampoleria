import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProductsList';
import EditProduct from './components/EditProduct';
import AuthPage from './components/AuthPage';
import NoMatch from './components/NoMatch';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './components/Home';

const App = () => {
  return (
    <div className='App'>
      <Router basename='/scampoleria'>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/products' element={<ProductsList />} />
            <Route path='/edit-product/:id' element={<EditProduct />} />
          </Route>
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
