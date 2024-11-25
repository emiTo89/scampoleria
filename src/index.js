import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import ProductsList from './components/ProductsList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <Router>
    <App>
      <Routes>
        <Route path='/' element={<AddProduct />} />
        <Route path='/products' element={<ProductsList />} />
        <Route path='/edit-product/:id' element={<EditProduct />} />
      </Routes>
    </App>
  </Router>
);
