import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import RoutesApp from './routes';
import DefaultTop from './utils/defaultTop';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
  <BrowserRouter>
   <DefaultTop />
   <RoutesApp />
  </BrowserRouter>
 </React.StrictMode>
);
reportWebVitals();
