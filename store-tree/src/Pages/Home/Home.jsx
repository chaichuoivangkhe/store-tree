import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header'
import ExploreMenu from '../../components/ExploreMenu'
import ProductDisplay from '../../components/ProductDisplay';
import AppDown from '../../components/AppDown';
const Home = () => {
  const [category, setCategory] = useState("All"); // State for category

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <ProductDisplay category={category} />
      <AppDown />
    </div>
  );
};

export default Home;
