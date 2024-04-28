import React from 'react';
import RecentlyAddedProducts from '../../../components/marketPlace/RecentlyAddedProducts/RecentlyAddedProducts';
import './HomePage.css'
import TopSellingProducts from '../../../components/marketPlace/TopSellingProducts/TopSellingProducts';
import FeatureBar from '../../../components/marketPlace/FeatureBar/FeatureBar';
const MarketplaceHomePage = () => {
  return (
    <div>
      <h1 className='text-center'>Welcome to Our Marketplace!</h1>
      <section>
        <FeatureBar />
      </section>
      <section>
        
        <div style={{margin: '20px 0'}}>
          <RecentlyAddedProducts />
        </div>
      </section>
      {/* Special Offers Section */}
      <section>
        <h2>Special Offers</h2>
        {/* Placeholder for Special Offers Component */}
        <div style={{margin: '20px 0'}}>
          Special Offers Here
        </div>
        {/* <SpecialOffers /> */}
      </section>

      {/* Most Bought Products Section */}
      <section>
      
        <div style={{margin: '20px 0'}}>
          <TopSellingProducts />    
        </div>
        {/* <MostBoughtProducts /> */}
      </section>

      {/* Top Sellers Section */}
      <section>
        <h2>Top Sellers</h2>
        {/* Placeholder for Top Sellers Component */}
        <div style={{margin: '20px 0', backgroundColor: '#d9edf7'}}>
          Product Owners with Highest Sales Here
        </div>
        {/* <TopSellers /> */}
      </section>
    </div>
  );
};

export default MarketplaceHomePage;
