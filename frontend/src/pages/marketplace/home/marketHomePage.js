import React from 'react';
import RecentlyAddedProducts from '../../../components/marketPlace/RecentlyAddedProducts/RecentlyAddedProducts';
import './HomePage.css'
import TopSellingProducts from '../../../components/marketPlace/TopSellingProducts/TopSellingProducts';
import FeatureBar from '../../../components/marketPlace/FeatureBar/FeatureBar';
import SpecialOffers from '../../../components/marketPlace/SpecialOffers/SpecialOffers';
const MarketplaceHomePage = () => {
  return (
    <div className="homepage">
      <h1 className='text-center'>Discover Exceptional Deals at Our Premier Marketplace!</h1>
      <section className="feature-section">
        <FeatureBar />
      </section>
      <section className="recent-products">
        <div className="section-content">
          <RecentlyAddedProducts />
        </div>
      </section>
      <section className="special-offers">
      <h2>Special Offers</h2>
        <SpecialOffers />
      </section>
      <section className="top-selling">
        <div className="section-content">
          <TopSellingProducts />    
        </div>
      </section>
      <section className="top-sellers">
        <h2>Top Sellers</h2>
        <div className="section-content" style={{backgroundColor: '#d9edf7'}}>
          Product Owners with Highest Sales Here
        </div>
      </section>
    </div>
  );
};

export default MarketplaceHomePage;
