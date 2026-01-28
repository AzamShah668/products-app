import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-main">AXM ENTERPRISES</span>
          <span className="logo-dot" />
        </Link>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="navMenu">
          <li><NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>Products</NavLink></li>
          <li><a href="/#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="/#explore" className="nav-link" onClick={() => setMenuOpen(false)}>Explore</a></li>
          <li><a href="/#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
        <div className="nav-actions">
          <button type="button" className="btn-icon" aria-label="Search"><i className="fas fa-search" /></button>
          <button type="button" className="btn-icon" aria-label="Cart"><i className="fas fa-shopping-bag" /><span className="cart-badge">0</span></button>
          {user ? (
            <button type="button" className="btn-icon" onClick={() => { logout(); navigate('/'); }} aria-label="Logout" title="Logout"><i className="fas fa-sign-out-alt" /></button>
          ) : (
            <Link to="/login" className="btn-icon" aria-label="Login" title="Login"><i className="fas fa-user" /></Link>
          )}
          <button type="button" className="btn-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
