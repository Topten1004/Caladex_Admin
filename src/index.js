import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

import reportWebVitals from './utils/reportWebVitals';

const getLibrary = (provider) => {
  return new ethers.providers.Web3Provider(provider) ;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById('root')
);

reportWebVitals();
