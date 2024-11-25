import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const EditProductComponent = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const params = useParams();

  const getProductById = async () => {
    try {
      const response = await axios.get(
        `https://localhost:8081/getProduct?productId=${params.id}`
      );

      if (response) {
        setTitle(response.data.title);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
      }
    } catch (err) {
      console.log(err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  getProductById();

  console.log(error, loading);

  const editProduct = async () => {
    try {
      const response = await axios.post(
        'https://192.168.1.106:8081/edit-product',
        {
          id: params.id,
          title: title,
          price: price,
          quantity: quantity,
        }
      );
      console.log('====================================');
      console.log(response);
      console.log('====================================');
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ margin: '1rem 0', padding: '1rem' }}
          name='title'
          placeholder='Insert title'
          type='text'
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ margin: '1rem 0', padding: '1rem' }}
          name='price'
          placeholder='Insert price'
          type='number'
        />
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ margin: '1rem 0', padding: '1rem' }}
          type='number'
          name='quantity'
          placeholder='Insert quantity'
        />
        <button
          disabled={isDisabled()}
          onClick={editProduct}
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

export default EditProductComponent;
