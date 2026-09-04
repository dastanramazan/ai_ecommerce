import React, { useEffect, useState } from 'react'
import Main from '../Components/Main/Main'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import Reviews from '../Components/Reviews/Reviews'
import AboutUs from '../Components/AboutUs/AboutUs'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const Shop = () => {

  const [popular, setPopular] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/popularinwomen`)
      .then((res) => res.json())
      .then((data) => {
        setPopular(data);
        setPopularLoading(false);
      });
  }, [])


  return (
    <div>
      <Main/>
      <AboutUs/>
      <Reviews/>
      <Popular data={popular} loading={popularLoading}/>
      <Offers/>
      <NewsLetter/>
    </div>
  )
}

export default Shop
