import React from 'react';

const NoProductsFound = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-pink"
      style={{
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        animation: 'fade-in 0.5s ease-in-out',
      }}
    >
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>No Products Found</h2>
        <p style={{ color: '#555' }}>Sorry, it seems like there are no products available in this category.</p>
      </div>
    </div>
  );
};

export default NoProductsFound;
