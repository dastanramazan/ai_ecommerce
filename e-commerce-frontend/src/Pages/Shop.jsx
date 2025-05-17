import React, { useEffect, useState } from 'react'
import Main from '../Components/Main/Main'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import Reviews from '../Components/Reviews/Reviews'
import Cakes from '../Components/Cakes/Cakes'
import Pinata from '../Components/Pinata/Pinata'
import SugarSheets from '../Components/SugarSheets/SugarSheets'

const Shop = () => {

  const [popular, setPopular] = useState([]);
  const [newcollection, setNewCollection] = useState([]);

  const fetchInfo = () => { 
    fetch('http://localhost:4000/popularinwomen') 
            .then((res) => res.json()) 
            .then((data) => setPopular(data))
    fetch('http://localhost:4000/newcollections') 
            .then((res) => res.json()) 
            .then((data) => setNewCollection(data))
    }

    useEffect(() => {
      fetchInfo();
    }, [])


  return (
    <div>
      <Main/>
      <Reviews/>
      <Cakes/>
      <Pinata/>
      <SugarSheets/>
      <Popular data={popular}/>
      <Offers/>
      <NewsLetter/>
    </div>
  )
}

export default Shop
