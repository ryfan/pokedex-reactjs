import React, { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/notfound';
import Main from '../pages/main';
import Detail from '../pages/main/detail';

export default function RoutesApp() {
 return (
  <Routes>
   <Fragment>
    <Route path="*" element={<NotFound />} />
    <Route path="/" element={<Main />} />
    <Route path="/pokemon" element={<Navigate to="/" />} />
    <Route path="/pokemon/:id" element={<Detail />} />
   </Fragment>
  </Routes>
 );
}
