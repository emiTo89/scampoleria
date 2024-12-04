import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import apiRequest from '../api';
import endpoints from '../api/endpoints/endpoints';

const ProductsList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getProducts = useCallback(async () => {
    try {
      const response = await apiRequest('GET', endpoints.getProducts);
      console.log(response);
      setData(response);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /*   const getProducts = async () => {
    try {
      const response = await apiRequest('GET', endpoints.getProducts);
      console.log(response);
      setData(response);
    } catch (err) {
      console.log(err);
      console.log(error);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }; */

  const removeProduct = async (id) => {
    try {
      await apiRequest('GET', `${endpoints.deleteProduct}?id=${id}`);
      getProducts();
    } catch (err) {
      console.log(err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const goToEditPage = (id) => {
    navigate(`/edit-product/${id}`);
  };

  console.log(error);

  return (
    <>
      {loading ? <h5>Products are loading...</h5> : null}
      {data && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '2rem',
          }}
        >
          <ul
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {data?.map((product) => {
              return (
                <li
                  style={{
                    listStyle: 'none',
                  }}
                  className='productCard'
                  key={product.id}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <button onClick={() => goToEditPage(product.id)}>
                      EDIT
                    </button>
                    <button onClick={() => removeProduct(product.id)}>
                      REMOVE
                    </button>
                  </div>
                  <div className='dataContainer'>
                    <div>
                      <span>Title:</span> <span>{product?.title}</span>
                    </div>
                    <div>
                      <span>Price:</span> <span>{product?.price}</span>
                    </div>
                    <div>
                      <span>Quantity:</span> <span>{product?.quantity}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductsList;
