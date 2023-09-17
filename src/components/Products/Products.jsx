import React, { useEffect } from 'react';
import { getProducts } from '../../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(products);
  return <div>asd</div>;
};

export default Products;
