import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
const LayoutContainer = ({ component: Component, isHeader, isFooter, title }) => {
  document.title = title;


  return (
    <>
      {isHeader && <Header />}
      <Component />
      {isFooter && <Footer />}
    </>
  );
};

export default LayoutContainer;
