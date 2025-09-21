import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, containerClass = '' }) => {
  return (
    <div className={containerClass}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
