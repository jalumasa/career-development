import React from 'react';

const LoadingIndicator = ({ label = 'Loading...' }) => (
  <p className="loading-indicator">{label}</p>
);

export default LoadingIndicator;
