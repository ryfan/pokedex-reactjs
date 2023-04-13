import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/notfound';
import Main from '../pages/main';

export default function RoutesApp() {
 return (
  <Routes>
   <Fragment>
    <Route path="*" element={<NotFound />} />
    <Route path="/" element={<Main />} />
   </Fragment>
  </Routes>
 );
}
