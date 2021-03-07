import React from 'react';

import './LoadingIndicator.css';

// the loading indicator and its styling were copied from Academind's Udemy Course 'React Complete Course', with adjustements

const LoadingIndicator = () => (
  <div className="lds-ring">
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default LoadingIndicator;
