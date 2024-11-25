import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const addProduct = async () => {
    console.log('response');
    try {
      const response = await axios.post(
        'http://192.168.1.106:8081/add-product',
        {
          title: title,
          price: price,
          quantity: quantity,
        }
      );
      setData(response.data);
    } catch (err) {
      console.log(err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = () => {
    return title && price && quantity ? false : true;
  };

  console.log('', data, error, loading);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: '30rem' }}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          style={{ margin: '1rem 0', padding: '1rem' }}
          name='title'
          placeholder='Insert title'
          type='text'
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          style={{ margin: '1rem 0', padding: '1rem' }}
          name='price'
          placeholder='Insert price'
          type='number'
        />
        <input
          onChange={(e) => setQuantity(e.target.value)}
          style={{ margin: '1rem 0', padding: '1rem' }}
          type='number'
          name='quantity'
          placeholder='Insert quantity'
        />
        <button
          disabled={isDisabled()}
          onClick={addProduct}
          style={{
            opacity: isDisabled() ? 0.8 : null,
            margin: '1rem',
            padding: '1rem',
          }}
        >
          Add product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
