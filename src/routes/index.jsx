import React, { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/notfound';
import Main from '../pages/main';
import Detail from '../pages/main/detail';
import Search from '../pages/search';

export default function RoutesApp() {
 return (
  <Routes>
   <Fragment>
    <Route path="*" element={<NotFound />} />
    <Route path="/" element={<Main />} />
    <Route path="/search" element={<Search />} />
    <Route path="/pokemon" element={<Navigate to="/" />} />
    <Route path="/pokemon/:id" element={<Detail />} />
   </Fragment>
  </Routes>
 );
}
