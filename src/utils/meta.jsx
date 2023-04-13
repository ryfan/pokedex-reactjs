import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Meta(props) {
 return (
  <HelmetProvider>
   <Helmet>
    <title>
     {props.title} - {process.env.REACT_APP_TITLE}
    </title>
   </Helmet>
  </HelmetProvider>
 );
}
