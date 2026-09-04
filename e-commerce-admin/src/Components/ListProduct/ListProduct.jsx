import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
const PAGE_SIZE = 10;

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchInfo = (pageToLoad) => {
    fetch(`${API_URL}/allproducts?page=${pageToLoad}&limit=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setPage(data.page);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      })
  }

    useEffect(() => {
      fetchInfo(1);
    }, [])

    const removeProduct = async (id) => {
      await fetch(`${API_URL}/removeproduct`, {
      method: 'POST',
      headers: {
        Accept:'application/json',
        'Content-Type':'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({id:id}),
    })

    fetchInfo(page)
    }

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
      <div className="listproduct-allproducts">
        <hr />
        {products.map((e) => {
          return (
            <div key={e.id}>
              <div className="listproduct-format-main listproduct-format">
                <img className="listproduct-product-icon" src={e.image} alt="" />
                <p className="cartitems-product-title">{e.name}</p>
                <p>${e.old_price}</p>
                <p>${e.new_price}</p>
                <p>{e.category}</p>
                <img className="listproduct-remove-icon" onClick={()=>{removeProduct(e.id)}} src={cross_icon} alt="" />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div className="listproduct-pagination">
        <button disabled={page <= 1} onClick={() => fetchInfo(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages} ({total} products)</span>
        <button disabled={page >= totalPages} onClick={() => fetchInfo(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ListProduct;
