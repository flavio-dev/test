import React from 'react';
import Nav from '../Nav/Nav';

const Layout = ({ children }) => (
  <div>
    <Nav/>
    {children}
  </div>
);

export default Layout;