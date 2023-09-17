import React, { useEffect, useState } from 'react';
import { getProducts } from '../../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import './../../App.css';

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [orderProp, setOrderProp] = useState('title');

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const printItem = item => {
    return (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.price}€</td>
        <td>{item.category}</td>
      </tr>
    );
  };

  const printButton = pageNum => {
    return (
      <li key={pageNum}>
        <button
          onClick={() => {
            setCurrentPage(pageNum - 1);
          }}
        >
          {pageNum}
        </button>
      </li>
    );
  };

  const buttons = [];
  const pages = products.length / itemsPerPage;
  for (let i = 1; i <= pages; i++) {
    buttons.push(printButton(i));
  }

  const productsToPrint = products
    .toSorted((a, b) => {
      if (a[orderProp] < b[orderProp]) {
        return -1;
      }
      if (a[orderProp] > b[orderProp]) {
        return 1;
      }
      return 0;
    })
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const rows = productsToPrint.map(printItem);

  const table = (
    <div>
      <table>
        <thead>
          <tr>
            <th
              className={orderProp === 'title' ? 'sorting' : ''}
              onClick={() => {
                setOrderProp('title');
              }}
            >
              Title
            </th>
            <th
              className={orderProp === 'price' ? 'sorting' : ''}
              onClick={() => {
                setOrderProp('price');
              }}
            >
              Price
            </th>
            <th
              className={orderProp === 'category' ? 'sorting' : ''}
              onClick={() => {
                setOrderProp('category');
              }}
            >
              Caregory
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <ul className="pages">
        <li>
          <button
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            &lt;
          </button>
        </li>
        {buttons}
        <li>
          <button
            onClick={() => {
              if (currentPage < pages - 1) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  );
  return <div>{table}</div>;
};

export default Products;
