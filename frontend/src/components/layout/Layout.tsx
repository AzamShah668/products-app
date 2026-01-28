import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Navbar />
    <main style={{ paddingTop: '5.5rem' }}>{children}</main>
    <Footer />
    <BackToTop />
  </>
);

export default Layout;
