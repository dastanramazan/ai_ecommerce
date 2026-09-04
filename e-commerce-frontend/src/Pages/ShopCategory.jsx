import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import { FiChevronDown } from "react-icons/fi";
import Item from "../Components/Item/Item";
import { ProductCardSkeleton } from "../Components/Skeleton/Skeleton";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
const PAGE_SIZE = 12;

const ShopCategory = (props) => {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchPage = (pageToLoad, append) => {
    setLoading(true);
    fetch(`${API_URL}/allproducts?category=${props.category}&page=${pageToLoad}&limit=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts((prev) => append ? [...prev, ...data.products] : data.products);
        setPage(data.page);
        setTotalPages(data.totalPages);
        setTotal(data.total);
        setLoading(false);
        setInitialLoading(false);
      });
  };

  useEffect(() => {
    setInitialLoading(true);
    fetchPage(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]);

  const showingCount = products.length;

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p><span>Showing 1 - {showingCount}</span> out of {total} Products</p>
        <div className="shopcategory-sort">Sort by <FiChevronDown /></div>
      </div>
      <div className="shopcategory-products">
        {initialLoading
          ? <ProductCardSkeleton count={8} />
          : products.map((item, i) => (
              <Item id={item.id} key={i} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))
        }
      </div>
      {page < totalPages && (
        <div className="shopcategory-loadmore" onClick={() => !loading && fetchPage(page + 1, true)}>
          {loading ? "Loading..." : "Load More"}
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
