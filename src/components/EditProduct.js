import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import apiRequest from '../api';
import endpoints from '../api/endpoints/endpoints';

const EditProductComponent = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const params = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await apiRequest(
          'GET',
          `${endpoints.getProductById}${params.id}`
        );

        if (response) {
          setTitle(response.title);
          setPrice(response.price);
          setQuantity(response.quantity);
        }
      } catch (err) {
        console.log(err);

        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProductById();
  }, [params]);

  console.log(error, loading);

  const editProduct = async () => {
    try {
      const response = await apiRequest('POST', endpoints.editProduct, {
        id: params.id,
        title: title,
        price: price,
        quantity: quantity,
      });
      console.log(response);
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
