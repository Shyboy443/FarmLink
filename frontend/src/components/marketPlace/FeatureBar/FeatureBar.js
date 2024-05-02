import React from 'react';
import { FaMoneyBillWave, FaUsers, FaShippingFast, FaLock, FaShieldAlt } from 'react-icons/fa';
import './FeatureBar.css'; 

const FeatureBar = () => {
  return (
    <div className="feature-bar">
      <h4>Better choices,<br/>better prices</h4>
      <div className="feature-items">
        <div className="feature-item">
          <FaMoneyBillWave size={20} />
          <p>Value-for-money</p>
          <span>We offer competitive prices on <br/>millions of items</span>
        </div>
        <div className="feature-item">
          <FaUsers size={20} />
          <p>Shoppers worldwide</p>
          <span>More than 300 million shoppers <br/>from 200+ countries & regions</span>
        </div>
        <div className="feature-item">
          <FaShippingFast size={20} />
          <p>Fast delivery</p>
          <span>Faster delivery on selected items thanks to <br/>our improved logistics</span>
        </div>
        <div className="feature-item">
          <FaLock size={17} />
          <p>Safe payments</p>
          <span>Safe payment methods preferred <br/>by international shoppers</span>
        </div>
        <div className="feature-item">
          <FaShieldAlt size={17} />
          <p>Buyer protection</p>
          <span>Get a refund if items arrive late or<br/> not as described</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureBar;
