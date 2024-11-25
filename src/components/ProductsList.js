import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router';

const ProductsList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    console.log('response');
    try {
      const response = await axios.get('http://localhost:8081/get-products');
      setData(response.data);
    } catch (err) {
      console.log(err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      await axios.post(`http://localhost:8081/delete-product/${id}`);
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
  }, []);

  console.log(error);

  const goToEditPage = (id) => {
    redirect(`/edit-product/${id}`);
  };

  return (
    <>
      {loading ? <h5>Products are loading...</h5> : null}
      {data && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            margin: '2rem',
          }}
        >
          <ul>
            {data?.map((product) => {
              return (
                <li
                  style={{
                    listStyle: 'none',
                    borderBottom: '1px solid gray',
                    width: '100%',
                  }}
                  key={product.id}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        marginLeft: '10rem',
                        marginTop: '0.5rem',
                        cursor: 'pointer',
                      }}
                      onClick={() => goToEditPage(product.id)}
                    >
                      EDIT
                    </div>
                    <div
                      style={{
                        marginLeft: '10rem',
                        marginTop: '0.5rem',
                        cursor: 'pointer',
                      }}
                      onClick={() => removeProduct(product.id)}
                    >
                      REMOVE
                    </div>
                  </div>

                  <p>Title: {product?.title}</p>
                  <p>Price: {product?.price}</p>
                  <p>Quantity: {product?.quantity}</p>
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
